import api from './api';

export const invoiceService = {
  getAllInvoices: async () => {
    const response = await api.get('/invoices');
    return response.data;
  },

  getInvoiceById: async (id) => {
    const response = await api.get(`/invoices/${id}`);
    return response.data;
  },

  createInvoice: async (invoiceData) => {
    const response = await api.post('/invoices', invoiceData);
    return response.data;
  },

  updateInvoice: async (id, invoiceData) => {
    const response = await api.put(`/invoices/${id}`, invoiceData);
    return response.data;
  },

  deleteInvoice: async (id) => {
    await api.delete(`/invoices/${id}`);
  },

  getInvoiceByInvoiceNo: async (invoiceNo) => {
    const response = await api.get(`/invoices/invoiceNo/${invoiceNo}`);
    return response.data;
  },

  getInvoicesByEstimatedId: async (estimatedId) => {
    const response = await api.get(`/invoices/estimated/${estimatedId}`);
    return response.data;
  },

  getInvoicesByChainId: async (chainId) => {
    const response = await api.get(`/invoices/chain/${chainId}`);
    return response.data;
  },

  getInvoicesByEmailId: async (emailId) => {
    const response = await api.get(`/invoices/email/${emailId}`);
    return response.data;
  },

  getInvoicesByServiceDetails: async (serviceDetails) => {
    const response = await api.get(`/invoices/service/${serviceDetails}`);
    return response.data;
  },
};
