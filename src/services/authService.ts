// src/services/authService.ts

import api from '../utils/api'; // Axios instance

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Authentication-related requests
export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', data);
    return response.data;
  },

  refreshAccessToken: async (refreshToken: string): Promise<string> => {
    const response = await api.post<{ accessToken: string }>('/auth/refresh', {
      refreshToken,
    });
    return response.data.accessToken;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },

  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/request-password-reset', { email });
    return response.data;
  },

  validateResetToken: async (token: string): Promise<void> => {
    await api.get(`/auth/reset-password/${token}`);
  },

  resetPassword: async (
    token: string,
    newPassword: string
  ): Promise<{ message: string }> => {
    const response = await api.post(`/auth/reset-password/${token}`, {
      newPassword,
    });
    return response.data;
  },
};
