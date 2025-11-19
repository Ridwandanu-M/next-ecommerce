class XenditClient {
  constructor() {
    this.apiKey = process.env.XENDIT_SECRET_KEY;
    this.baseURL = process.env.NODE_ENV === 'production'
      ? 'https://api.xendit.co'
      : 'https://api.xendit.co';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${Buffer.from(this.apiKey + ':').toString('base64')}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Xendit API request failed');
      }

      return data;
    } catch (error) {
      console.error('Xendit API Error:', error);
      throw error;
    }
  }

  // Create Invoice
  async createInvoice(invoiceData) {
    return this.request('/v2/invoices', {
      method: 'POST',
      body: invoiceData
    });
  }

  // Get Invoice
  async getInvoice(invoiceId) {
    return this.request(`/v2/invoices/${invoiceId}`);
  }

  // Expire Invoice
  async expireInvoice(invoiceId) {
    return this.request(`/v2/invoices/${invoiceId}/expire`, {
      method: 'POST'
    });
  }

  // Create Payment Link
  async createPaymentLink(paymentData) {
    return this.request('/payment_links', {
      method: 'POST',
      body: paymentData
    });
  }

  // Virtual Account
  async createVirtualAccount(vaData) {
    return this.request('/callback_virtual_accounts', {
      method: 'POST',
      body: vaData
    });
  }

  // E-Wallet
  async createEWalletCharge(chargeData) {
    return this.request('/ewallets/charges', {
      method: 'POST',
      body: chargeData
    });
  }

  // Credit Card
  async createCreditCardCharge(chargeData) {
    return this.request('/credit_card_charges', {
      method: 'POST',
      body: chargeData
    });
  }
}

export default XenditClient;
