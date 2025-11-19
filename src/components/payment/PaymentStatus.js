'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import usePayment from '../../hooks/usePayment';

export default function PaymentStatus({ orderId, refreshInterval = 5000, onStatusChange }) {
  const router = useRouter();
  const {
    loading,
    error,
    getPaymentStatus,
    cancelPayment,
    retryPayment,
    formatCurrency,
    formatDate,
    getStatusColor,
    getStatusText,
    isPaymentActive
  } = usePayment();

  const [paymentData, setPaymentData] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch payment status
  const fetchStatus = async (showLoading = true) => {
    if (!orderId) return;

    try {
      if (showLoading) {
        setIsRefreshing(true);
      }

      const data = await getPaymentStatus(orderId);
      setPaymentData(data);
      onStatusChange?.(data);
    } catch (err) {
      console.error('Failed to fetch payment status:', err);
    } finally {
      if (showLoading) {
        setIsRefreshing(false);
      }
    }
  };

  // Auto refresh for pending payments
  useEffect(() => {
    if (!orderId) return;

    // Initial fetch
    fetchStatus();

    // Auto refresh only for pending payments
    if (paymentData?.status === 'PENDING' && refreshInterval > 0) {
      const interval = setInterval(() => {
        fetchStatus(false); // Don't show loading for background refresh
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [orderId, paymentData?.status, refreshInterval]);

  // Handle retry payment
  const handleRetryPayment = async () => {
    if (!paymentData?.amount) return;

    try {
      setActionLoading(true);
      const result = await retryPayment(orderId, paymentData.amount);

      if (result.invoiceUrl) {
        window.location.href = result.invoiceUrl;
      }
    } catch (err) {
      console.error('Retry payment error:', err);
      alert('Gagal membuat pembayaran ulang. Silakan coba lagi.');
    } finally {
      setActionLoading(false);
    }
  };

  // Handle cancel payment
  const handleCancelPayment = async () => {
    if (!confirm('Apakah Anda yakin ingin membatalkan pembayaran ini?')) {
      return;
    }

    try {
      setActionLoading(true);
      await cancelPayment(orderId);
      fetchStatus(); // Refresh status after cancel
      alert('Pembayaran berhasil dibatalkan');
    } catch (err) {
      console.error('Cancel payment error:', err);
      alert('Gagal membatalkan pembayaran. Silakan coba lagi.');
    } finally {
      setActionLoading(false);
    }
  };

  // Render loading state
  if (loading && !paymentData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error && !paymentData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Gagal Memuat Status</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchStatus()}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-600">
          <p>Data pembayaran tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const statusColor = getStatusColor(paymentData.status);
  const statusText = getStatusText(paymentData.status);
  const canRetry = isPaymentActive(paymentData.status, paymentData.expiryDate);
  const isPaid = paymentData.status === 'PAID';
  const isPending = paymentData.status === 'PENDING';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with Status */}
      <div className={`px-6 py-4 ${isPaid ? 'bg-green-50' : isPending ? 'bg-yellow-50' : 'bg-red-50'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isPaid ? 'bg-green-100' : isPending ? 'bg-yellow-100' : 'bg-red-100'
            }`}>
              {isPaid ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : isPending ? (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Status Pembayaran</h3>
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                {statusText}
              </span>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={() => fetchStatus()}
            disabled={isRefreshing}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Refresh Status"
          >
            <svg
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Payment Details */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium text-gray-900">{orderId}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Total Pembayaran:</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(paymentData.amount)}
              </span>
            </div>

            {paymentData.paidAt && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tanggal Bayar:</span>
                <span className="font-medium text-gray-900">
                  {formatDate(paymentData.paidAt)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {paymentData.invoiceUrl && (
              <div className="flex justify-between">
                <span className="text-gray-600">Invoice:</span>
                <a
                  href={paymentData.invoiceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Lihat Invoice
                </a>
              </div>
            )}

            {paymentData.expiryDate && !isPaid && (
              <div className="flex justify-between">
                <span className="text-gray-600">Berlaku Hingga:</span>
                <span className="font-medium text-gray-900">
                  {formatDate(paymentData.expiryDate)}
                </span>
              </div>
            )}

            {isPending && (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Info:</strong> Pembayaran sedang menunggu. Status akan diperbarui otomatis ketika pembayaran berhasil.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      {(canRetry || isPending) && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-3">
            {isPending && paymentData.invoiceUrl && (
              <a
                href={paymentData.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Lanjutkan Pembayaran
              </a>
            )}

            {canRetry && !isPending && (
              <button
                onClick={handleRetryPayment}
                disabled={actionLoading}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading ? 'Memproses...' : 'Bayar Ulang'}
              </button>
            )}

            {(isPending || canRetry) && (
              <button
                onClick={handleCancelPayment}
                disabled={actionLoading}
                className="inline-flex items-center justify-center px-4 py-2 border border-red-300 text-sm font-medium rounded-lg text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 transition-colors"
              >
                {actionLoading ? 'Memproses...' : 'Batalkan'}
              </button>
            )}

            <button
              onClick={() => router.push('/dashboard/orders')}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Lihat Semua Pesanan
            </button>
          </div>
        </div>
      )}

      {/* Success Actions */}
      {isPaid && (
        <div className="px-6 py-4 bg-green-50 border-t border-green-200">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-4 py-2 border border-green-300 text-sm font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Cetak Bukti
            </button>

            <button
              onClick={() => router.push('/dashboard/orders')}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Lihat Pesanan
            </button>

            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Lanjut Berbelanja
            </button>
          </div>
        </div>
      )}

      {/* Auto refresh indicator */}
      {isPending && refreshInterval > 0 && (
        <div className="px-6 py-2 bg-blue-50 border-t border-blue-200">
          <p className="text-xs text-blue-600 text-center">
            Status diperbarui otomatis setiap {refreshInterval / 1000} detik
          </p>
        </div>
      )}
    </div>
  );
}
