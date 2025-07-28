import { createSlice } from "@reduxjs/toolkit";

interface TripState {
  trips: any[];
  tripItemSelected: any | null;
}

const initialState: TripState = {
  trips: [],
  // Dùng trong trường hợp chọn 1 tríp và truyền nó sang trang thanh toán
  tripItemSelected: null,
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setSelectedTrip: (state, action) => {
      state.tripItemSelected = action.payload;
    },
  },
});

export const { setSelectedTrip } = tripSlice.actions;

export default tripSlice.reducer;
