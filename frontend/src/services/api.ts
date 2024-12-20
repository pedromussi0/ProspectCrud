import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session-based auth
});

// Function to get CSRF token from cookie
function getCsrfToken() {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  // Only add CSRF token for non-GET requests
  if (config.method !== 'get') {
    config.headers['X-CSRFToken'] = getCsrfToken();
  }
  return config;
});

// Types
export interface Lead {
  id?: number;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  facebook?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await api.post('/auth/login/', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout/');
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/user/');
    return response.data;
  },
  
  register: async (data: RegistrationData) => {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },
};

// Leads API
export const leadsApi = {
  // Get all leads
  getLeads: async () => {
    const response = await api.get('/leads/');
    return response.data;
  },

  // Get single lead
  getLead: async (id: number) => {
    const response = await api.get(`/leads/${id}/`);
    return response.data;
  },

  // Create new lead
  createLead: async (lead: Omit<Lead, 'id'>) => {
    const response = await api.post('/leads/', lead);
    return response.data;
  },

  // Update lead
  updateLead: async (id: number, lead: Partial<Lead>) => {
    const response = await api.put(`/leads/${id}/`, lead);
    return response.data;
  },

  // Delete lead
  deleteLead: async (id: number) => {
    await api.delete(`/leads/${id}/`);
  },
};

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

