'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated' && orderId) {
      fetchPaymentStatus();
    }
  }, [status, orderId]);

  const fetchPaymentStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/payment/status?orderId=${orderId}`);
      const result = await response.json();

      if (result.success) {
        setPaymentData(result.data);
      } else {
        setError(result.error || 'Failed to fetch payment status');
      }
    } catch (err) {
      console.error('Fetch payment status error:', err);
      setError('Failed to fetch payment status');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-lg">Memverifikasi pembayaran...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-red-800 mb-2">Terjadi Kesalahan</h1>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-yellow-800 mb-2">Order ID Tidak Ditemukan</h1>
          <p className="text-yellow-600 mb-4">Tidak dapat menemukan informasi pembayaran.</p>
          <Link
            href="/dashboard"
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isPaymentSuccess = paymentData?.status === 'PAID';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className={`px-6 py-8 text-center ${
            isPaymentSuccess ? 'bg-green-50' : 'bg-gray-50'
          }`}>
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isPaymentSuccess ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              {isPaymentSuccess ? (
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>

            <h1 className={`text-3xl font-bold mb-2 ${
              isPaymentSuccess ? 'text-green-800' : 'text-gray-800'
            }`}>
              {isPaymentSuccess ? 'Pembayaran Berhasil!' : 'Status Pembayaran'}
            </h1>

            <p className={`text-lg ${
              isPaymentSuccess ? 'text-green-600' : 'text-gray-600'
            }`}>
              {isPaymentSuccess
                ? 'Terima kasih! Pembayaran Anda telah berhasil diproses.'
                : `Status: ${paymentData?.status || 'Unknown'}`
              }
            </p>
          </div>

          {/* Payment Details */}
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Informasi Pesanan</h3>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium text-gray-900">{orderId}</span>
                  </div>

                  {paymentData?.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Pembayaran:</span>
                      <span className="font-medium text-gray-900">
                        {formatCurrency(paymentData.amount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                      paymentData?.status === 'PAID'
                        ? 'bg-green-100 text-green-800'
                        : paymentData?.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {paymentData?.status || 'Unknown'}
                    </span>
                  </div>

                  {paymentData?.paidAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tanggal Bayar:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(paymentData.paidAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Informasi Pembayaran</h3>

                <div className="space-y-2">
                  {paymentId && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-medium text-gray-900">{paymentId}</span>
                    </div>
                  )}

                  {paymentData?.invoiceUrl && (
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

                  {paymentData?.expiryDate && paymentData?.status !== 'PAID' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Berlaku Hingga:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(paymentData.expiryDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard/orders"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Lihat Pesanan Saya
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Lanjut Berbelanja
              </Link>

              {isPaymentSuccess && (
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center px-6 py-3 border border-green-300 text-base font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                >
                  Cetak Bukti Bayar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {isPaymentSuccess && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Langkah Selanjutnya</h3>
            <ul className="text-blue-700 space-y-1">
              <li>• Kami akan memproses pesanan Anda dalam 1-2 hari kerja</li>
              <li>• Anda akan menerima email konfirmasi dengan detail pengiriman</li>
              <li>• Pantau status pesanan di dashboard Anda</li>
              <li>• Hubungi customer service jika ada pertanyaan</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
