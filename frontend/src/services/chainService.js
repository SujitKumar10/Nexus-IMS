import api from './api';

export const chainService = {
  getAllChains: async () => {
    const response = await api.get('/chains');
    return response.data;
  },

  getChainById: async (id) => {
    const response = await api.get(`/chains/${id}`);
    return response.data;
  },

  createChain: async (chainData) => {
    const response = await api.post('/chains', chainData);
    return response.data;
  },

  updateChain: async (id, chainData) => {
    const response = await api.put(`/chains/${id}`, chainData);
    return response.data;
  },

  deleteChain: async (id) => {
    await api.delete(`/chains/${id}`);
  },
};
