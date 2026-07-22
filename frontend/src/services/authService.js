import api from './api';

export const authService = {
  login: async (email, password) => {
    console.log('🔐 Login attempt:', email);
    try {
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log('✅ Login successful - token stored');
      } else {
        console.error('❌ Login failed: No token in response');
      }
      return response.data;
    } catch (err) {
      console.error('❌ Login error:', err.response?.data?.message || err.message);
      throw err;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await api.post('/users/register', { name, email, password });
      console.log('✅ Registration successful');
      return response.data;
    } catch (err) {
      console.error('❌ Registration error:', err.response?.data?.message || err.message);
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ Logged out');
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (err) {
      console.error('❌ Error parsing user data:', err);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};
