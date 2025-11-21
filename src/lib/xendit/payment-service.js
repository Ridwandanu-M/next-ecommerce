import XenditClient from './config.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const xendit = new XenditClient();

export class PaymentService {
  constructor() {
    this.xendit = xendit;
    this.prisma = prisma;
  }

  // Create payment invoice
  async createPaymentInvoice(orderId, userId, amount, items = []) {
    try {
      // Get user data
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Create external ID
      const externalId = `order-${orderId}-${Date.now()}`;

      // Prepare invoice data
      const invoiceData = {
        external_id: externalId,
        amount: amount,
        payer_email: user.email,
        description: `Payment for Order #${orderId}`,
        invoice_duration: 86400, // 24 hours
        customer: {
          given_names: user.name,
          email: user.email,
          mobile_number: user.phone || '',
          addresses: user.address ? [{
            city: '',
            country: 'Indonesia',
            postal_code: '',
            state: '',
            street_line1: user.address,
            street_line2: ''
          }] : []
        },
        customer_notification_preference: {
          invoice_created: ['email'],
          invoice_reminder: ['email'],
          invoice_paid: ['email'],
          invoice_expired: ['email']
        },
        success_redirect_url: `${process.env.NEXTAUTH_URL}/payment/success?order_id=${orderId}`,
        failure_redirect_url: `${process.env.NEXTAUTH_URL}/payment/failed?order_id=${orderId}`,
        currency: 'IDR',
        items: items.length > 0 ? items : [{
          name: `Order #${orderId}`,
          quantity: 1,
          price: amount
        }],
        fees: [{
          type: 'Admin Fee',
          value: 0
        }]
      };

      // Create invoice via Xendit
      const invoice = await this.xendit.createInvoice(invoiceData);

      // Update order with Xendit invoice data
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          xenditInvoiceId: invoice.id,
          invoiceUrl: invoice.invoice_url,
          status: 'PENDING'
        }
      });

      return {
        success: true,
        data: {
          invoiceId: invoice.id,
          invoiceUrl: invoice.invoice_url,
          externalId: invoice.external_id,
          amount: invoice.amount,
          status: invoice.status,
          expiryDate: invoice.expiry_date
        }
      };

    } catch (error) {
      console.error('Create payment invoice error:', error);
      throw new Error(error.message || 'Failed to create payment invoice');
    }
  }

  // Create payment link (alternative method)
  async createPaymentLink(orderId, userId, amount, description = '') {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const externalId = `payment-link-${orderId}-${Date.now()}`;

      const paymentLinkData = {
        external_id: externalId,
        amount: amount,
        description: description || `Payment for Order #${orderId}`,
        invoice_duration: 86400,
        customer: {
          given_names: user.name,
          email: user.email,
          mobile_number: user.phone || ''
        },
        success_redirect_url: `${process.env.NEXTAUTH_URL}/payment/success?order_id=${orderId}`,
        failure_redirect_url: `${process.env.NEXTAUTH_URL}/payment/failed?order_id=${orderId}`,
        currency: 'IDR'
      };

      const paymentLink = await this.xendit.createPaymentLink(paymentLinkData);

      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          xenditInvoiceId: paymentLink.id,
          invoiceUrl: paymentLink.payment_url,
          status: 'PENDING'
        }
      });

      return {
        success: true,
        data: {
          paymentLinkId: paymentLink.id,
          paymentUrl: paymentLink.payment_url,
          externalId: paymentLink.external_id,
          amount: paymentLink.amount,
          status: paymentLink.status
        }
      };

    } catch (error) {
      console.error('Create payment link error:', error);
      throw new Error(error.message || 'Failed to create payment link');
    }
  }

  // Handle payment webhook
  async handlePaymentWebhook(webhookData) {
    try {
      const { external_id, status, payment_method } = webhookData;

      // Extract order ID from external_id
      const orderIdMatch = external_id.match(/order-(\w+)-/);
      if (!orderIdMatch) {
        throw new Error('Invalid external_id format');
      }

      const orderId = orderIdMatch[1];

      // Find order
      const order = await this.prisma.order.findUnique({
        where: { id: orderId }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      // Update order status based on payment status
      let orderStatus = 'PENDING';

      switch (status) {
        case 'PAID':
          orderStatus = 'PAID';
          break;
        case 'EXPIRED':
        case 'FAILED':
          orderStatus = 'FAILED';
          break;
        default:
          orderStatus = 'PENDING';
      }

      // Update order
      const updatedOrder = await this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: orderStatus,
          updatedAt: new Date()
        }
      });

      return {
        success: true,
        data: {
          orderId: orderId,
          status: orderStatus,
          paymentMethod: payment_method
        }
      };

    } catch (error) {
      console.error('Handle payment webhook error:', error);
      throw new Error(error.message || 'Failed to handle payment webhook');
    }
  }

  // Get payment status
  async getPaymentStatus(orderId) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId }
      });

      if (!order || !order.xenditInvoiceId) {
        throw new Error('Order or payment not found');
      }

      // Get invoice status from Xendit
      const invoice = await this.xendit.getInvoice(order.xenditInvoiceId);

      // Update local order status if different
      if (invoice.status !== order.status) {
        let orderStatus = 'PENDING';

        switch (invoice.status) {
          case 'PAID':
            orderStatus = 'PAID';
            break;
          case 'EXPIRED':
          case 'FAILED':
            orderStatus = 'FAILED';
            break;
          default:
            orderStatus = 'PENDING';
        }

        await this.prisma.order.update({
          where: { id: orderId },
          data: { status: orderStatus }
        });
      }

      return {
        success: true,
        data: {
          orderId: orderId,
          status: invoice.status,
          amount: invoice.amount,
          invoiceUrl: invoice.invoice_url,
          paidAt: invoice.paid_at,
          expiryDate: invoice.expiry_date
        }
      };

    } catch (error) {
      console.error('Get payment status error:', error);
      throw new Error(error.message || 'Failed to get payment status');
    }
  }

  // Cancel payment
  async cancelPayment(orderId) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id: orderId }
      });

      if (!order || !order.xenditInvoiceId) {
        throw new Error('Order or payment not found');
      }

      // Expire invoice in Xendit
      await this.xendit.expireInvoice(order.xenditInvoiceId);

      // Update order status
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELED'
        }
      });

      return {
        success: true,
        message: 'Payment canceled successfully'
      };

    } catch (error) {
      console.error('Cancel payment error:', error);
      throw new Error(error.message || 'Failed to cancel payment');
    }
  }

  // Create order from cart
  async createOrderFromCart(userId) {
    try {
      // Get user's cart items
      const cartItems = await this.prisma.cartItem.findMany({
        where: { userId },
        include: {
          product: true
        }
      });

      if (cartItems.length === 0) {
        throw new Error('Cart is empty');
      }

      // Calculate total amount
      const totalAmount = cartItems.reduce((total, item) => {
        return total + (Number(item.product.price) * item.quantity);
      }, 0);

      // Create order
      const order = await this.prisma.order.create({
        data: {
          userId,
          totalAmount,
          status: 'PENDING'
        }
      });

      // Clear cart
      await this.prisma.cartItem.deleteMany({
        where: { userId }
      });

      // Prepare items for invoice
      const invoiceItems = cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: Number(item.product.price),
        url: `${process.env.NEXTAUTH_URL}/products/${item.product.slug}`
      }));

      return {
        success: true,
        data: {
          order,
          items: invoiceItems,
          totalAmount
        }
      };

    } catch (error) {
      console.error('Create order from cart error:', error);
      throw new Error(error.message || 'Failed to create order from cart');
    }
  }
}

export default PaymentService;
