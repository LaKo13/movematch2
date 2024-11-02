export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'customer' | 'mover';
  companyName?: string;
  createdAt?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  userType: 'customer' | 'mover';
  companyName?: string;
}

export interface MoveRequest {
  id: string;
  customerId: string;
  status: 'draft' | 'pending' | 'accepted' | 'completed';
  pickupDate: string;
  flexibleDate: boolean;
  pickupLocation: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  dropoffLocation: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  inventory: InventoryItem[];
  specialInstructions?: string;
  bids: Bid[];
  acceptedBid?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  description?: string;
  photos: string[];
  specialHandling?: string;
}

export interface Bid {
  id: string;
  moverId: string;
  moveRequestId: string;
  amount: number;
  estimatedDuration: string;
  message?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}