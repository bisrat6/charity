import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to sign in
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  }
)

// Auth API calls
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  signin: (data) => api.post('/auth/signin', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    api.post('/auth/reset-password', { token, password }),
  getMe: () => api.get('/auth/me'),
}

// Campaigns API calls
export const campaignsAPI = {
  getAll: () => api.get('/campaigns'),
  getById: (id) => api.get(`/campaigns/${id}`),
  create: (data) => api.post('/campaigns', data),
  update: (id, data) => api.put(`/campaigns/${id}`, data),
  delete: (id) => api.delete(`/campaigns/${id}`),
}

// Donations API calls
export const donationsAPI = {
  createPaymentIntent: (data) => api.post('/donations/create-payment-intent', data),
  getUserDonations: (userId) => api.get(`/donations/user/${userId}`),
  getStats: () => api.get('/donations/stats'),
  verifyPayment: (data) => api.post('/donations/webhook', data),
}

// Volunteers API calls
export const volunteersAPI = {
  apply: (data) => api.post('/volunteers/apply', data),
  getAllApplications: () => api.get('/volunteers/applications'),
  updateStatus: (id, status) => api.put(`/volunteers/${id}/status`, { status }),
  getByUser: (userId) => api.get(`/volunteers/user/${userId}`),
}

// Stats API calls
export const statsAPI = {
  getStats: () => api.get('/stats'),
}

// Users API calls
export const usersAPI = {
  getAll: () => api.get('/users'),
}

export default api

