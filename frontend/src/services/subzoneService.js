import api from './api';

export const subzoneService = {
  getAllSubzones: async () => {
    const response = await api.get('/subzones');
    return response.data;
  },

  getSubzoneById: async (id) => {
    const response = await api.get(`/subzones/${id}`);
    return response.data;
  },

  createSubzone: async (subzoneData) => {
    const response = await api.post('/subzones', subzoneData);
    return response.data;
  },

  updateSubzone: async (id, subzoneData) => {
    const response = await api.put(`/subzones/${id}`, subzoneData);
    return response.data;
  },

  deleteSubzone: async (id) => {
    await api.delete(`/subzones/${id}`);
  },
};
