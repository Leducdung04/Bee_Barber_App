import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { get_list_barber } from '../../Services/api/httpStylist';

// Thunk để lấy danh sách thợ cắt tóc từ API
export const fetchBarbers = createAsyncThunk(
  'barbers/fetchBarbers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_list_barber()
      return response; // Giả sử API trả về mảng thợ cắt tóc
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const barbersSlice = createSlice({
  name: 'barbers',
  initialState: {
    barbers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBarbers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBarbers.fulfilled, (state, action) => {
        state.loading = false;
        state.barbers = action.payload;
      })
      .addCase(fetchBarbers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default barbersSlice.reducer;
