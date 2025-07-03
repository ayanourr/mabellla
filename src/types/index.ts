export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description: string;
  image: string;
  images?: string[];
  video?: string;
  category: string;
  inStock: boolean;
  quantity: number;
  featured?: boolean;
  bestseller?: boolean;
  colors?: string[];
  sizes?: string[];
  rating?: number;
  reviewCount?: number;
  selectedSize?: string;
  selectedColor?: string;
  shopifyId?: string;
  shopifyHandle?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}