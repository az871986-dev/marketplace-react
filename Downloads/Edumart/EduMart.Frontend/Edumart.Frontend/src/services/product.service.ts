// src/services/product.service.ts
import apiClient from '../config/api.config';
import {
  ApiResponse,
  PagedResponse,
  Product,
  ProductFilter,
  CreateProductRequest,
} from '../types/api.types';

export const productService = {
  // Get all products with filters
  getProducts: async (filter: ProductFilter): Promise<ApiResponse<PagedResponse<Product>>> => {
    const params = new URLSearchParams();
    
    if (filter.categoryId) params.append('categoryId', filter.categoryId);
    if (filter.vendorId) params.append('vendorId', filter.vendorId);
    if (filter.minPrice) params.append('minPrice', filter.minPrice.toString());
    if (filter.maxPrice) params.append('maxPrice', filter.maxPrice.toString());
    if (filter.searchTerm) params.append('searchTerm', filter.searchTerm);
    if (filter.status) params.append('status', filter.status.toString());
    if (filter.isFeatured !== undefined) params.append('isFeatured', filter.isFeatured.toString());
    if (filter.sortBy) params.append('sortBy', filter.sortBy);
    if (filter.sortDescending !== undefined) params.append('sortDescending', filter.sortDescending.toString());
    params.append('pageNumber', filter.pageNumber.toString());
    params.append('pageSize', filter.pageSize.toString());

    const response = await apiClient.get<ApiResponse<PagedResponse<Product>>>(
      `/Products?${params.toString()}`
    );
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/Products/${id}`);
    return response.data;
  },

  // Get product by slug
  getProductBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/Products/slug/${slug}`);
    return response.data;
  },

  // Create product (Vendor/Admin only)
  createProduct: async (data: CreateProductRequest): Promise<ApiResponse<Product>> => {
    const response = await apiClient.post<ApiResponse<Product>>('/Products', data);
    return response.data;
  },

  // Update product (Vendor/Admin only)
  updateProduct: async (id: string, data: Partial<CreateProductRequest>): Promise<ApiResponse<Product>> => {
    const response = await apiClient.put<ApiResponse<Product>>(`/Products/${id}`, data);
    return response.data;
  },

  // Delete product (Vendor/Admin only)
  deleteProduct: async (id: string): Promise<ApiResponse<boolean>> => {
    const response = await apiClient.delete<ApiResponse<boolean>>(`/Products/${id}`);
    return response.data;
  },
};
