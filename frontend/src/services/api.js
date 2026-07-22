import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      tokenPrefix: token ? token.substring(0, 20) + '...' : 'none'
    });
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Authorization header set:', config.headers.Authorization.substring(0, 30) + '...');
    } else {
      console.warn('⚠️ No token found in localStorage for request to:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      url: response.config?.url,
      status: response.status,
      statusText: response.statusText
    });
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const endpoint = error.config?.url;
    
    console.error('API Response Error:', {
      status: status,
      statusText: error.response?.statusText,
      message: error.response?.data?.message,
      endpoint: endpoint,
      method: error.config?.method,
      hasToken: !!localStorage.getItem('token')
    });
    
    // Only redirect on 401 if it's not a login attempt
    if (status === 401 && endpoint !== '/auth/login') {
      console.error('🚨 401 UNAUTHORIZED - Token invalid, clearing auth and redirecting', {
        message: error.response?.data?.message,
        endpoint: endpoint,
        token: localStorage.getItem('token') ? 'exists (clearing)' : 'missing'
      });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Use setTimeout to prevent redirect loops
      setTimeout(() => {
        window.location.href = '/';
      }, 100);
    }
    
    return Promise.reject(error);
  }
);

export default api;
