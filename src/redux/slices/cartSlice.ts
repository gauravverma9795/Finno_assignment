import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, CartItem, Product } from '../../types';

const loadCart = (): CartItem[] => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    return JSON.parse(savedCart);
  }
  return [];
};

const calculateTotal = (items: CartItem[], products: Product[]): number => {
  return items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
};

const initialState: CartState = {
  items: loadCart(),
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action: PayloadAction<{ productId: number; quantity: number }>) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem('cart');
    },
    updateTotal: (state, action: PayloadAction<Product[]>) => {
      state.total = calculateTotal(state.items, action.payload);
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, updateTotal } = cartSlice.actions;

export default cartSlice.reducer;