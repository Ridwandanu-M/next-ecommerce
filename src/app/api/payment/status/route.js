import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import PaymentService from '../../../../lib/xendit/payment-service.js';

const paymentService = new PaymentService();

export async function GET(request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get order ID from query parameters
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get payment status
    const result = await paymentService.getPaymentStatus(orderId);

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to get payment status',
        success: false
      },
      { status: 500 }
    );
  }
}

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
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get payment status
    const result = await paymentService.getPaymentStatus(orderId);

    return NextResponse.json({
      success: true,
      data: result.data
    });

  } catch (error) {
    console.error('Get payment status error:', error);
    return NextResponse.json(
      {
        error: error.message || 'Failed to get payment status',
        success: false
      },
      { status: 500 }
    );
  }
}
