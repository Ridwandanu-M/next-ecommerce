'use client';

import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export function usePayment() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create payment invoice
  const createPayment = useCallback(async (paymentData) => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create payment');
      }

      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Create order and payment from cart
  const createOrderFromCart = useCallback(async () => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/create', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create order from cart');
      }

      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Get payment status
  const getPaymentStatus = useCallback(async (orderId) => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/payment/status?orderId=${orderId}`, {
        method: 'GET',
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to get payment status');
      }

      return result.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Cancel payment
  const cancelPayment = useCallback(async (orderId) => {
    if (!session) {
      throw new Error('User not authenticated');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to cancel payment');
      }

      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Retry payment with new invoice
  const retryPayment = useCallback(async (orderId, amount, items = []) => {
    return createPayment({
      orderId,
      amount,
      items,
      paymentType: 'invoice'
    });
  }, [createPayment]);

  // Utility function to format currency
  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  }, []);

  // Utility function to format date
  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  // Get payment status color
  const getStatusColor = useCallback((status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
      case 'EXPIRED':
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }, []);

  // Get payment status text
  const getStatusText = useCallback((status) => {
    switch (status?.toUpperCase()) {
      case 'PAID':
        return 'Berhasil';
      case 'PENDING':
        return 'Menunggu Pembayaran';
      case 'FAILED':
        return 'Gagal';
      case 'EXPIRED':
        return 'Kadaluarsa';
      case 'CANCELED':
        return 'Dibatalkan';
      default:
        return status || 'Tidak Diketahui';
    }
  }, []);

  // Check if payment is still active (can be paid)
  const isPaymentActive = useCallback((status, expiryDate) => {
    if (status?.toUpperCase() === 'PAID') {
      return false; // Already paid
    }

    if (status?.toUpperCase() === 'CANCELED' || status?.toUpperCase() === 'FAILED') {
      return false; // Cannot be paid
    }

    if (expiryDate) {
      const expiry = new Date(expiryDate);
      const now = new Date();
      return expiry > now; // Check if not expired
    }

    return status?.toUpperCase() === 'PENDING';
  }, []);

  // Payment method configurations
  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      description: 'Transfer melalui ATM, Internet Banking, atau Mobile Banking',
      icon: '🏦',
      available: true
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      description: 'OVO, Dana, LinkAja, ShopeePay',
      icon: '📱',
      available: true
    },
    {
      id: 'virtual_account',
      name: 'Virtual Account',
      description: 'BCA, BNI, BRI, Mandiri',
      icon: '💳',
      available: true
    },
    {
      id: 'credit_card',
      name: 'Kartu Kredit',
      description: 'Visa, Mastercard, JCB',
      icon: '💳',
      available: true
    },
    {
      id: 'qris',
      name: 'QRIS',
      description: 'Scan QR Code untuk pembayaran instant',
      icon: '📲',
      available: true
    }
  ];

  return {
    // States
    loading,
    error,

    // Actions
    createPayment,
    createOrderFromCart,
    getPaymentStatus,
    cancelPayment,
    retryPayment,

    // Utilities
    formatCurrency,
    formatDate,
    getStatusColor,
    getStatusText,
    isPaymentActive,

    // Constants
    paymentMethods,

    // Clear error
    clearError: () => setError(null)
  };
}

export default usePayment;
