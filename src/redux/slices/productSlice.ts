import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from '../../types';
import { fetchProducts, fetchProductById, fetchCategories, fetchProductsByCategory } from '../../services/api';

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  return await fetchProducts();
});

export const getProductById = createAsyncThunk('products/getProductById', async (id: number) => {
  return await fetchProductById(id);
});

export const getAllCategories = createAsyncThunk('products/getAllCategories', async () => {
  return await fetchCategories();
});

export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (category: string) => {
    return await fetchProductsByCategory(category);
  }
);

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  categories: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle getAllProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      // Handle getProductById
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      })
      // Handle getAllCategories
      .addCase(getAllCategories.fulfilled, (state, action: PayloadAction<string[]>) => {
        state.categories = action.payload;
      })
      // Handle getProductsByCategory
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      });
  },
});

export default productSlice.reducer;