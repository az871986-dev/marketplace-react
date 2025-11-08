// src/services/auth.service.ts
import apiClient from '../config/api.config';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UpdateUserRequest,
  ChangePasswordRequest,
} from '../types/api.types';

export const authService = {
  // Register new user
  register: async (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/Auth/register', data);
    return response.data;
  },

  // Login user
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await apiClient.post<ApiResponse<LoginResponse>>('/Auth/login', data);
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await apiClient.get<ApiResponse<User>>('/Auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<ApiResponse<User>>('/Auth/update-profile', data);
    return response.data;
  },

  // Change password
  changePassword: async (data: ChangePasswordRequest): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.post<ApiResponse<boolean>>('/Auth/change-password', data);
    return response.data;
  },

  // Logout (clear local storage)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};
