// src/services/cart.service.ts
import apiClient from '../config/api.config';
import { ApiResponse, Cart, AddToCartRequest, UpdateCartItemRequest } from '../types/api.types';

export const cartService = {
  // Get user's cart
  getCart: async (): Promise<ApiResponse<Cart>> => {
    const response = await apiClient.get<ApiResponse<Cart>>('/Cart');
    return response.data;
  },

  // Add item to cart
  addToCart: async (data: AddToCartRequest): Promise<ApiResponse<Cart>> => {
    const response = await apiClient.post<ApiResponse<Cart>>('/Cart', data);
    return response.data;
  },

  // Update cart item quantity
  updateCartItem: async (id: string, data: UpdateCartItemRequest): Promise<ApiResponse<Cart>> => {
    const response = await apiClient.put<ApiResponse<Cart>>(`/Cart/${id}`, data);
    return response.data;
  },

  // Remove item from cart
  removeFromCart: async (id: string): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/Cart/${id}`);
    return response.data;
  },

  // Clear entire cart
  clearCart: async (): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>('/Cart');
    return response.data;
  },
};
