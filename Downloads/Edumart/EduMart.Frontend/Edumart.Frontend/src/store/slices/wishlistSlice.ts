// src/store/slices/wishlistSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { wishlistService } from '../../services/other.services';
import { Wishlist, AddToWishlistRequest } from '../../types/api.types';
import { getErrorMessage } from '../../config/api.config';

interface WishlistState {
  wishlist: Wishlist | null;
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  wishlist: null,
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await wishlistService.getWishlist();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const addToWishlist = createAsyncThunk(
  'wishlist/add',
  async (data: AddToWishlistRequest, { rejectWithValue }) => {
    try {
      await wishlistService.addToWishlist(data);
      const response = await wishlistService.getWishlist();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await wishlistService.removeFromWishlist(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => { state.loading = true; })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (state.wishlist) {
          state.wishlist.items = state.wishlist.items.filter((item) => item.id !== action.payload);
        }
      });
  },
});

export const { clearError } = wishlistSlice.actions;
export default wishlistSlice.reducer;
