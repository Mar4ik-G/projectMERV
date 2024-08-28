import axios from 'axios';
import { tokenService } from '../services/tokenService';
import { authService } from '../services/authService.ts';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = tokenService.getRefreshToken();
        if (refreshToken) {
          const newAccessToken =
            await authService.refreshAccessToken(refreshToken);
          tokenService.setAccessToken(newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (err) {
        tokenService.removeAccessToken();
        tokenService.removeRefreshToken();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
