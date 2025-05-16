import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  fontName: "",
};

export const fontSlice = createSlice({
  name: "font",
  initialState,
  reducers: {
    setFont: (state, action: PayloadAction<string>) => {
      state.fontName = action.payload;
    },
  },
});

export const { setFont } = fontSlice.actions;
export default fontSlice.reducer;
