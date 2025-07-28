import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterTripState {
  fromLocationId: string;
  toLocationId: string;
  departTime: string;
  busType?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page: number;
  limit: number;
}

const initialState: FilterTripState = {
  fromLocationId: "",
  toLocationId: "",
  departTime: "",
  page: 1,
  limit: 5,
};

const filterTripSlice = createSlice({
  name: "filterTrip",
  initialState: initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterTripState>>) => {
      return { ...state, ...action.payload };
    },
    resetFilter: (state) => {
      return {
        ...state,
        busType: undefined,
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: undefined,
        page: 1,
        limit: 5,
      };
    },
  },
});

export const { setFilter, resetFilter } = filterTripSlice.actions;
export default filterTripSlice.reducer;
