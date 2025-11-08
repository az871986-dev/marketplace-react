export interface Product {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  category: string;
  categoryAr: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  vendor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'vendor';
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
}

export type PageType = 
  | 'home' 
  | 'login' 
  | 'product' 
  | 'cart' 
  | 'wishlist' 
  | 'checkout' 
  | 'confirmation' 
  | 'orders' 
  | 'profile' 
  | 'vendor'
  | '404'
  | '500';
