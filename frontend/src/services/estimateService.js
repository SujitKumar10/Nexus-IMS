import api from './api';

export const estimateService = {
  getAllEstimates: async () => {
    const response = await api.get('/estimates');
    return response.data;
  },

  getEstimateById: async (id) => {
    const response = await api.get(`/estimates/${id}`);
    return response.data;
  },

  createEstimate: async (estimateData) => {
    const response = await api.post('/estimates', estimateData);
    return response.data;
  },

  updateEstimate: async (id, estimateData) => {
    const response = await api.put(`/estimates/${id}`, estimateData);
    return response.data;
  },

  deleteEstimate: async (id) => {
    await api.delete(`/estimates/${id}`);
  },

  getEstimatesByChainId: async (chainId) => {
    const response = await api.get(`/estimates/chain/${chainId}`);
    return response.data;
  },

  getEstimatesByGroupName: async (groupName) => {
    const response = await api.get(`/estimates/group/${groupName}`);
    return response.data;
  },

  getEstimatesByBrandName: async (brandName) => {
    const response = await api.get(`/estimates/brand/${brandName}`);
    return response.data;
  },

  getEstimatesByZoneName: async (zoneName) => {
    const response = await api.get(`/estimates/zone/${zoneName}`);
    return response.data;
  },
};
