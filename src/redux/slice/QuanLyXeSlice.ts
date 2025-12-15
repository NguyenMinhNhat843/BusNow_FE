import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {},
};

const quanLyXeSlice = createSlice({
  name: "QuanLyXeSlice",
  initialState: initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = quanLyXeSlice.actions;
export default quanLyXeSlice.reducer;
