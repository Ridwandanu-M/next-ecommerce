import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import PaymentService from '../../../../lib/xendit/payment-service.js';

const paymentService = new PaymentService();

export async function POST(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderId, amount, items, paymentType = 'invoice' } = body;

    // Validate required fields
    if (!orderId || !amount) {
      return NextResponse.json(
        { error: 'Order ID and amount are required' },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be greater than 0' },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    let result;

    // Create payment based on type
    if (paymentType === 'payment_link') {
      result = await paymentService.createPaymentLink(
        orderId,
        userId,
        amount,
        `Payment for Order #${orderId}`
      );
    } else {
      // Default to invoice
      result = await paymentService.createPaymentInvoice(
        orderId,
        userId,
        amount,
        items
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment created successfully',
      data: result.data
    });

  } catch (error) {
    console.error('Payment creation error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to create payment',
        success: false
      },
      { status: 500 }
    );
  }
}

// Create order and payment from cart
export async function PUT(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // Create order from cart
    const orderResult = await paymentService.createOrderFromCart(userId);

    if (!orderResult.success) {
      return NextResponse.json(
        { error: 'Failed to create order from cart' },
        { status: 400 }
      );
    }

    const { order, items, totalAmount } = orderResult.data;

    // Create payment invoice
    const paymentResult = await paymentService.createPaymentInvoice(
      order.id,
      userId,
      totalAmount,
      items
    );

    return NextResponse.json({
      success: true,
      message: 'Order and payment created successfully',
      data: {
        order,
        payment: paymentResult.data
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to create order and payment',
        success: false
      },
      { status: 500 }
    );
  }
}
