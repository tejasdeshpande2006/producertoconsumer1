export type UserRole = 'admin' | 'producer' | 'consumer' | 'delivery';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string;
  smsNotifications?: boolean;
  role: UserRole;
  walletBalance: number;
  isVerified: boolean;
  pendingProfileChanges?: {
    name: string;
    email: string;
    phoneNumber?: string;
    timestamp: any;
  };
  isOnline?: boolean;
  strikes?: number;
  isSuspended?: boolean;
  location?: {
    lat: number;
    lng: number;
    lastUpdated: any;
  };
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  videoUrl?: string;
}

export interface Order {
  id: string;
  buyerId: string;
  buyerName?: string;
  shippingAddress?: string;
  sellerId: string;
  deliveryBoyId?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  totalAmount: number;
  timestamp: any;
  items: {
    productId: string;
    title: string;
    price: number;
    quantity: number;
  }[];
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  timestamp: any;
  description: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  timestamp: any;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  timestamp: any;
}
