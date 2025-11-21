"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import usePayment from "../../hooks/usePayment";

export default function PaymentCheckout({
  cartItems,
  totalAmount,
  onSuccess,
  onError,
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    loading,
    error,
    createOrderFromCart,
    formatCurrency,
    paymentMethods,
    clearError,
  } = usePayment();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("invoice");
  const [processingPayment, setProcessingPayment] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (session?.user) {
      setUserInfo({
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
      });
    }
  }, [session]);

  const handleCheckout = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    if (cartItems.length === 0) {
      onError?.("Keranjang belanja kosong");
      return;
    }

    if (!userInfo.name || !userInfo.email) {
      onError?.("Mohon lengkapi informasi profil Anda");
      return;
    }

    try {
      setProcessingPayment(true);
      clearError();

      // Create order and payment from cart
      const result = await createOrderFromCart();

      if (result.payment?.invoiceUrl) {
        // Redirect to Xendit payment page
        window.location.href = result.payment.invoiceUrl;
      } else {
        throw new Error("Payment URL not received");
      }

      onSuccess?.(result);
    } catch (err) {
      console.error("Checkout error:", err);
      onError?.(err.message || "Gagal memproses checkout");
    } finally {
      setProcessingPayment(false);
    }
  };

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!session) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Login Diperlukan
          </h3>
          <p className="text-gray-600 mb-4">
            Silakan login untuk melanjutkan checkout
          </p>
          <button
            onClick={() => router.push("/auth/signin")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Checkout Pembayaran
        </h2>
      </div>

      <div className="p-6">
        {/* Customer Information */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi Pembeli
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap *
              </label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nama lengkap"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Telepon
              </label>
              <input
                type="tel"
                value={userInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nomor telepon"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <textarea
                value={userInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan alamat lengkap"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Ringkasan Pesanan
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {item.product?.name || item.name}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {formatCurrency(
                      Number(item.product?.price || item.price) * item.quantity,
                    )}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  Total:
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Metode Pembayaran
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {paymentMethods
              .filter((method) => method.available)
              .map((method) => (
                <div
                  key={method.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPaymentMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {method.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {method.description}
                      </p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        selectedPaymentMethod === method.id
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedPaymentMethod === method.id && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Info:</span> Setelah klik
              &ldquo;Bayar Sekarang&rdquo;, Anda akan diarahkan ke halaman
              pembayaran yang aman dari Xendit dengan berbagai pilihan metode
              pembayaran.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-red-400 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Checkout Button */}
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handleCheckout}
            disabled={loading || processingPayment || cartItems.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading || processingPayment ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Memproses...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Bayar Sekarang - {formatCurrency(totalAmount)}
              </>
            )}
          </button>

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Pembayaran aman dengan teknologi enkripsi SSL
          </div>
        </div>

        {/* Payment Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Aman & Terpercaya</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Proses Instan</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg
              className="w-4 h-4 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M12 12h.01M12 12h.01"
              />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
