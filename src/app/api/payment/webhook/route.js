import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import PaymentService from '../../../../lib/xendit/payment-service.js';

const paymentService = new PaymentService();

// Verify Xendit webhook signature
function verifyXenditSignature(rawBody, signature, webhookToken) {
  const computedSignature = crypto
    .createHmac('sha256', webhookToken)
    .update(rawBody, 'utf8')
    .digest('hex');

  return signature === computedSignature;
}

export async function POST(request) {
  try {
    // Get the raw body for signature verification
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // Get headers
    const headersList = headers();
    const signature = headersList.get('x-callback-token');

    // Verify webhook signature (optional but recommended for security)
    const webhookToken = process.env.XENDIT_WEBHOOK_TOKEN;
    if (webhookToken && signature) {
      const isValidSignature = verifyXenditSignature(rawBody, signature, webhookToken);
      if (!isValidSignature) {
        console.error('Invalid webhook signature');
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
    }

    console.log('Xendit webhook received:', body);

    // Handle different webhook events
    switch (body.status) {
      case 'PAID':
        console.log(`Payment PAID for external_id: ${body.external_id}`);
        break;
      case 'EXPIRED':
        console.log(`Payment EXPIRED for external_id: ${body.external_id}`);
        break;
      case 'FAILED':
        console.log(`Payment FAILED for external_id: ${body.external_id}`);
        break;
      default:
        console.log(`Payment status ${body.status} for external_id: ${body.external_id}`);
    }

    // Process the webhook
    const result = await paymentService.handlePaymentWebhook(body);

    if (result.success) {
      console.log('Webhook processed successfully:', result.data);

      // Additional actions based on payment status
      if (body.status === 'PAID') {
        // You can add additional logic here like:
        // - Send confirmation email
        // - Update inventory
        // - Trigger order fulfillment
        console.log(`Order ${result.data.orderId} has been paid successfully`);
      }

      return NextResponse.json({
        success: true,
        message: 'Webhook processed successfully'
      });
    } else {
      console.error('Failed to process webhook:', result);
      return NextResponse.json(
        { error: 'Failed to process webhook' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Webhook processing error:', error);

    // Return 200 to prevent Xendit from retrying
    // Log the error for debugging
    return NextResponse.json({
      success: false,
      error: 'Webhook processing failed',
      message: error.message
    }, { status: 200 });
  }
}

// Handle GET request for webhook verification (some providers require this)
export async function GET() {
  return NextResponse.json({
    message: 'Xendit webhook endpoint is active',
    timestamp: new Date().toISOString()
  });
}
