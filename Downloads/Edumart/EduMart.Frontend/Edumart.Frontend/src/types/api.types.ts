// src/types/api.types.ts

// ==================== Common Types ====================
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PagedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

// ==================== User & Auth Types ====================
export enum UserRole {
  Customer = 1,
  Vendor = 2,
  Admin = 3,
}

export enum UserStatus {
  Active = 1,
  Inactive = 2,
  Suspended = 3,
  Banned = 4,
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profileImageUrl?: string;
  role: UserRole;
  status: UserStatus;
  emailConfirmed: boolean;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  user: User;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  profileImageUrl?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ==================== Product Types ====================
export enum ProductStatus {
  Draft = 1,
  Active = 2,
  Inactive = 3,
  OutOfStock = 4,
  Discontinued = 5,
}

export enum ProductType {
  Physical = 1,
  Digital = 2,
  Service = 3,
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stockQuantity: number;
  status: ProductStatus;
  type: ProductType;
  isFeatured: boolean;
  averageRating: number;
  reviewCount: number;
  mainImageUrl?: string;
  imageUrls: string[];
  categoryId: string;
  categoryName: string;
  vendorId: string;
  vendorName: string;
  createdAt: string;
}

export interface ProductFilter {
  categoryId?: string;
  vendorId?: string;
  minPrice?: number;
  maxPrice?: number;
  searchTerm?: string;
  status?: ProductStatus;
  isFeatured?: boolean;
  sortBy?: string;
  sortDescending?: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  cost?: number;
  sku: string;
  stockQuantity: number;
  lowStockThreshold?: number;
  type: ProductType;
  isFeatured: boolean;
  mainImageUrl?: string;
  imageUrls?: string[];
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  categoryId: string;
}

// ==================== Category Types ====================
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: string;
  productCount: number;
  subCategories: Category[];
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
  imageUrl?: string;
  parentCategoryId?: string;
  displayOrder: number;
}

// ==================== Cart Types ====================
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  quantity: number;
  total: number;
  stockQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

// ==================== Wishlist Types ====================
export interface WishlistItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  price: number;
  inStock: boolean;
  addedAt: string;
}

export interface Wishlist {
  items: WishlistItem[];
}

export interface AddToWishlistRequest {
  productId: string;
  notes?: string;
}

// ==================== Order Types ====================
export enum OrderStatus {
  Pending = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
  Cancelled = 5,
  Refunded = 6,
}

export enum PaymentStatus {
  Pending = 1,
  Paid = 2,
  Failed = 3,
  Refunded = 4,
}

export enum PaymentMethod {
  CreditCard = 1,
  DebitCard = 2,
  PayPal = 3,
  BankTransfer = 4,
  CashOnDelivery = 5,
}

export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productSku?: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  discount: number;
  total: number;
  trackingNumber?: string;
  createdAt: string;
  shippedAt?: string;
  deliveredAt?: string;
  orderItems: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
}

export interface CreateOrderRequest {
  paymentMethod: PaymentMethod;
  shippingAddressId: string;
  billingAddressId: string;
  customerNotes?: string;
  orderItems?: CreateOrderItemRequest[];
}

export interface CreateOrderItemRequest {
  productId: string;
  quantity: number;
}

export interface CreateAddressRequest {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
  isShipping: boolean;
  isBilling: boolean;
}

// ==================== Review Types ====================
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
}

export interface CreateReviewRequest {
  productId: string;
  rating: number;
  title: string;
  comment: string;
}
