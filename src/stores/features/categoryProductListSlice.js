import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_list_barber } from '../../Services/api/httpStylist';
import { get_List_Category_Product } from '../../Services/utils/httpCategoryProduct';

// Thunk để lấy danh sách thợ cắt tóc từ API
export const fetchcategoryProduct = createAsyncThunk(
  'categoryProducts/fetchcategoryProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_List_Category_Product()
      return response; // Giả sử API trả về mảng thợ cắt tóc
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const barbersSlice = createSlice({
  name: 'categoryProducts',
  initialState: {
    categoryProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategoryProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchcategoryProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload;
      })
      .addCase(fetchcategoryProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default barbersSlice.reducer;
