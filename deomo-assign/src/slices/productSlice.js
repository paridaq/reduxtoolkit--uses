import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const PRODUCTS_URL = 'https://dummyjson.com/products';
const CATEGORIES_URL = 'https://dummyjson.com/products/categories';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ category, limit, skip, search }) => {
    let url = `${PRODUCTS_URL}?limit=${limit}&skip=${skip}`;
    if (category) url = `${PRODUCTS_URL}/category/${category}?limit=${limit}&skip=${skip}`;
    if (search) url = `${PRODUCTS_URL}/search?q=${search}&limit=${limit}&skip=${skip}`;

    const response = await axios.get(url);
    return response.data;
  }
);

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const response = await axios.get(CATEGORIES_URL);
    return response.data;
  }
);

const initialState = {
  products: [],
  categories:[],
  category: '',
  search: '',
  limit: 10,
  skip: 0,
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.skip = 0;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.skip = 0;
    },
    resetProducts: (state) => {
      state.products = [];
      state.skip = 0;
    },
    loadMore: (state) => {
      state.skip += state.limit;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
     /* .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = [...state.products, ...action.payload.products];
      }) */
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          const existingIds = new Set(state.products.map(product => product.id));
          const newProducts = action.payload.products.filter(product => !existingIds.has(product.id));
          
          state.products = [...state.products, ...newProducts];
        })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setCategory, setSearch, resetProducts, loadMore } = productSlice.actions;
export default productSlice.reducer;
