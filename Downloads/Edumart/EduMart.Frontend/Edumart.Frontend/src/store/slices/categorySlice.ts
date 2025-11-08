// src/store/slices/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryService } from '../../services/other.services';
import { Category, CreateCategoryRequest } from '../../types/api.types';
import { getErrorMessage } from '../../config/api.config';

interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategories();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await categoryService.getCategoryById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: CreateCategoryRequest, { rejectWithValue }) => {
    try {
      const response = await categoryService.createCategory(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => { state.loading = true; })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      });
  },
});

export const { clearError } = categorySlice.actions;
export default categorySlice.reducer;
