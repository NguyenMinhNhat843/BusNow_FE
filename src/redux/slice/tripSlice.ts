import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

interface searchParams {
  fromLocationId: string | null;
  toLocationId: string | null;
  departTime: string | null;
  page?: number;
  limit: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface TripState {
  trips: any[];
  tripItemSelected: any | null;
  totalPage: number;
  currentPage: number;
  searchParams: searchParams;
}

const initialState: TripState = {
  trips: [],
  // Dùng trong trường hợp chọn 1 tríp và truyền nó sang trang thanh toán
  tripItemSelected: null,
  totalPage: 0,
  currentPage: 1,
  searchParams: {
    fromLocationId: null,
    toLocationId: null,
    departTime: null,
    limit: 5, // Default limit for pagination
  },
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    resetCurrentPageToFirst: (state) => {
      // Đặt lại trang hiện tại về trang đầu tiên
      state.searchParams.page = 1;
    },
    increaseCurrentPage: (state) => {
      state.currentPage += 1;
    },
    descreaseCurrentPage: (state) => {
      state.currentPage -= 1;
    },
    setSearchParams: (state, action) => {
      state.searchParams = {
        ...state.searchParams,
        ...action.payload,
      };
    },
    resetFilterTrips: (state) => {
      // Giữ nguyên các tham số tìm kiếm ban đầu
      const { fromLocationId, toLocationId, departTime, limit } =
        state.searchParams;

      state.searchParams = {
        fromLocationId,
        toLocationId,
        departTime,
        limit,
        page: 1,
      };
    },
    setSelectedTrip: (state, action) => {
      state.tripItemSelected = action.payload;
    },
  },
});

export const {
  setSearchParams,
  resetFilterTrips,
  resetCurrentPageToFirst,
  increaseCurrentPage,
  descreaseCurrentPage,
  setSelectedTrip,
} = tripSlice.actions;

export default tripSlice.reducer;
