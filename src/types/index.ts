export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  }
  
  export interface CartItem {
    productId: number;
    quantity: number;
  }
  
  export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
  }
  
  export interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
    categories: string[];
  }