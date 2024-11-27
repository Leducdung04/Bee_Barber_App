import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_List_Category } from '../../Services/utils/httpCategory';

// Thunk để lấy danh sách thợ cắt tóc từ API
export const fetchCategorys = createAsyncThunk(
  'categorys/fetchCategorys',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_List_Category()
      console.log('response', response)
      return response; // Giả sử API trả về mảng thợ cắt tóc
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: 'categorys',
  initialState: {
    categorys: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategorys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.loading = false;
        state.categorys = action.payload;
      })
      .addCase(fetchCategorys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
