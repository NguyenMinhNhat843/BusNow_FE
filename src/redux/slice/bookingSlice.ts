import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FromToInfo {
  name: string;
  stopPoint: string;
  time: string;
}

interface BookingState {
  tripId: string;
  from: FromToInfo;
  to: FromToInfo;
  selectedSeats: number[];
  totalAmount: number;
}

const initialState: BookingState = {
  tripId: "",
  from: {
    name: "",
    stopPoint: "",
    time: "",
  },
  to: {
    name: "",
    stopPoint: "",
    time: "",
  },
  selectedSeats: [],
  totalAmount: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTripInfo: (state, action: PayloadAction<string>) => {
      state.tripId = action.payload;
    },
    setSeats: (state, action: PayloadAction<number[]>) => {
      state.selectedSeats = action.payload;
    },
    setTotalAmout: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
    setFrom: (state, action: PayloadAction<FromToInfo>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<FromToInfo>) => {
      state.to = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const {
  setTripInfo,
  setSeats,
  setFrom,
  setTo,
  resetBooking,
  setTotalAmout,
} = bookingSlice.actions;

export default bookingSlice.reducer;
