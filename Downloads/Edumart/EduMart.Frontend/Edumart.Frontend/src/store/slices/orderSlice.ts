// src/store/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/other.services';
import { Order, CreateOrderRequest, Address, CreateAddressRequest } from '../../types/api.types';
import { getErrorMessage } from '../../config/api.config';

interface OrderState {
  orders: Order[];
  currentOrder: Order | null;
  addresses: Address[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  addresses: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getOrders();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await orderService.getOrderById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (data: CreateOrderRequest, { rejectWithValue }) => {
    try {
      const response = await orderService.createOrder(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const fetchAddresses = createAsyncThunk('addresses/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await orderService.getAddresses();
    return response.data;
  } catch (error: any) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createAddress = createAsyncThunk(
  'addresses/create',
  async (data: CreateAddressRequest, { rejectWithValue }) => {
    try {
      const response = await orderService.createAddress(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.addresses.push(action.payload);
      });
  },
});

export const { clearError, clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
