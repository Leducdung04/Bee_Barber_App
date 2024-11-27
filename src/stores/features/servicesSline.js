import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_List_Banner } from '../../Services/utils/httpBanner';
import { get_List_Services } from '../../Services/utils/httpServices';

// Thunk để lấy danh sách thợ cắt tóc từ API
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_List_Services()
      return response; // Giả sử API trả về mảng thợ cắt tóc
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
