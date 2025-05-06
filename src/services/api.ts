import axios from 'axios';
import { Product, User } from '../types';

const API_URL = 'https://fakestoreapi.com';

// Product API calls
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await axios.get(`${API_URL}/products/categories`);
  return response.data;
};

export const fetchProductsByCategory = async (category: string): Promise<Product[]> => {
  const response = await axios.get(`${API_URL}/products/category/${category}`);
  return response.data;
};

// Auth API calls (Note: We'll mock some of these since we're using local storage)
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};