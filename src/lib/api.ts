import type { SignupData, MoveRequest, Bid } from './types';

const API_URL = import.meta.env.VITE_API_URL;

async function handleResponse(response: Response) {
  const data = await response.json();
  
  if (!response.ok) {
    const error = new Error(data.message || 'An error occurred');
    console.error('API Error:', data);
    throw error;
  }
  
  return data;
}

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    },

    signup: async (data: SignupData) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    getProfile: async (token: string) => {
      const response = await fetch(`${API_URL}/users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  moves: {
    create: async (data: Partial<MoveRequest>, token: string) => {
      const response = await fetch(`${API_URL}/moves`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    },

    getAll: async (token: string) => {
      const response = await fetch(`${API_URL}/moves/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },

    getOne: async (id: string, token: string) => {
      const response = await fetch(`${API_URL}/moves/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  bids: {
    create: async (moveId: string, data: Partial<Bid>, token: string) => {
      const response = await fetch(`${API_URL}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ...data, moveId }),
      });
      return handleResponse(response);
    },

    accept: async (bidId: string, token: string) => {
      const response = await fetch(`${API_URL}/bids/${bidId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    },
  },

  notifications: {
    subscribe: async (subscription: PushSubscription, token: string) => {
      const response = await fetch(`${API_URL}/notifications/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ subscription }),
      });
      return handleResponse(response);
    },
  },
};