import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_List_Banner } from '../../Services/utils/httpBanner';

// Thunk để lấy danh sách thợ cắt tóc từ API
export const fetchBanners = createAsyncThunk(
  'banners/fetchBanners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_List_Banner()
      return response; // Giả sử API trả về mảng thợ cắt tóc
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bannersSlice = createSlice({
  name: 'banners',
  initialState: {
    banners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bannersSlice.reducer;
