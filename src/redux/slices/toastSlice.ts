/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToastState {
  isShowing: boolean;
  message: string;
  portalId: string;
}

const initialState: IToastState = {
  isShowing: false,
  message: "",
  portalId: "toast-portal",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShowing = action.payload;
    },
    setToastMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setProtalId: (state, action: PayloadAction<string>) => {
      state.portalId = action.payload;
    },
  },
});

export const { setShow, setToastMessage, setProtalId } = toastSlice.actions;

export default toastSlice.reducer;
