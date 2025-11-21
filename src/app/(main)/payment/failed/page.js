'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const [error, setError] = useState(null);

  const orderId = searchParams.get('order_id');
  const paymentId = searchParams.get('payment_id');
  const errorMessage = searchParams.get('error');

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

  const retryPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          amount: paymentData?.amount || 0,
          paymentType: 'invoice'
        }),
      });

      const result = await response.json();

      if (result.success && result.data?.invoiceUrl) {
        window.location.href = result.data.invoiceUrl;
      } else {
        alert('Gagal membuat pembayaran baru. Silakan coba lagi.');
      }
    } catch (err) {
      console.error('Retry payment error:', err);
      alert('Gagal membuat pembayaran baru. Silakan coba lagi.');
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
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-lg">Memeriksa status pembayaran...</p>
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 text-center bg-red-50">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold mb-2 text-red-800">
              Pembayaran Gagal
            </h1>

            <p className="text-lg text-red-600">
              Maaf, pembayaran Anda tidak dapat diproses.
            </p>

            {errorMessage && (
              <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  <strong>Alasan:</strong> {errorMessage}
                </p>
              </div>
            )}
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
                    <span className="font-medium px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      {paymentData?.status || 'FAILED'}
                    </span>
                  </div>

                  {paymentData?.expiryDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kadaluarsa:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(paymentData.expiryDate)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Failure Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Kemungkinan Penyebab</h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Dana tidak mencukupi</p>
                  <p>• Kartu kredit/debit ditolak</p>
                  <p>• Koneksi internet terputus</p>
                  <p>• Pembayaran melewati batas waktu</p>
                  <p>• Masalah teknis dari penyedia layanan</p>
                </div>

                {paymentId && (
                  <div className="mt-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-medium text-gray-900">{paymentId}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={retryPayment}
                disabled={loading}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Memproses...' : 'Coba Bayar Lagi'}
              </button>

              <Link
                href="/dashboard/orders"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Lihat Pesanan Saya
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-300 text-base font-medium rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                Kembali Berbelanja
              </Link>
            </div>
          </div>
        </div>

        {/* Help Information */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Butuh Bantuan?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
            <div>
              <h4 className="font-medium mb-2">Customer Service</h4>
              <p className="text-sm">Email: support@yourstore.com</p>
              <p className="text-sm">WhatsApp: +62 812-3456-7890</p>
              <p className="text-sm">Telepon: (021) 1234-5678</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Jam Operasional</h4>
              <p className="text-sm">Senin - Jumat: 09:00 - 18:00</p>
              <p className="text-sm">Sabtu: 09:00 - 15:00</p>
              <p className="text-sm">Minggu: Libur</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Tips:</strong> Pastikan kartu Anda memiliki saldo yang cukup dan aktif untuk transaksi online.
              Jika masalah berlanjut, hubungi bank atau penyedia e-wallet Anda.
            </p>
          </div>
        </div>

        {/* Retry Information */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">Informasi Penting</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Pesanan Anda masih tersimpan dan dapat dibayar ulang</li>
            <li>• Tidak ada biaya tambahan untuk mencoba pembayaran ulang</li>
            <li>• Jika tidak dibayar dalam 24 jam, pesanan akan dibatalkan otomatis</li>
            <li>• Simpan Order ID untuk referensi customer service</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
