// src/services/other.services.ts
import apiClient from '../config/api.config';
import { 
  ApiResponse, 
  Category, 
  CreateCategoryRequest,
  Order,
  CreateOrderRequest,
  Address,
  CreateAddressRequest,
  Wishlist,
  AddToWishlistRequest
} from '../types/api.types';

// ==================== Category Service ====================
export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<ApiResponse<Category[]>> => {
    const response = await apiClient.get<ApiResponse<Category[]>>('/Categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<ApiResponse<Category>> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/Categories/${id}`);
    return response.data;
  },

  // Create category (Admin only)
  createCategory: async (data: CreateCategoryRequest): Promise<ApiResponse<Category>> => {
    const response = await apiClient.post<ApiResponse<Category>>('/Categories', data);
    return response.data;
  },
};

// ==================== Order Service ====================
export const orderService = {
  // Get user's orders
  getOrders: async (): Promise<ApiResponse<Order[]>> => {
    const response = await apiClient.get<ApiResponse<Order[]>>('/Orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await apiClient.get<ApiResponse<Order>>(`/Orders/${id}`);
    return response.data;
  },

  // Create new order
  createOrder: async (data: CreateOrderRequest): Promise<ApiResponse<Order>> => {
    const response = await apiClient.post<ApiResponse<Order>>('/Orders', data);
    return response.data;
  },

  // Get user addresses
  getAddresses: async (): Promise<ApiResponse<Address[]>> => {
    const response = await apiClient.get<ApiResponse<Address[]>>('/Addresses');
    return response.data;
  },

  // Create address
  createAddress: async (data: CreateAddressRequest): Promise<ApiResponse<Address>> => {
    const response = await apiClient.post<ApiResponse<Address>>('/Addresses', data);
    return response.data;
  },
};

// ==================== Wishlist Service ====================
export const wishlistService = {
  // Get user's wishlist
  getWishlist: async (): Promise<ApiResponse<Wishlist>> => {
    const response = await apiClient.get<ApiResponse<Wishlist>>('/Wishlist');
    return response.data;
  },

  // Add item to wishlist
  addToWishlist: async (data: AddToWishlistRequest): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.post<ApiResponse<boolean>>('/Wishlist', data);
    return response.data;
  },

  // Remove item from wishlist
  removeFromWishlist: async (id: string): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/Wishlist/${id}`);
    return response.data;
  },
};
