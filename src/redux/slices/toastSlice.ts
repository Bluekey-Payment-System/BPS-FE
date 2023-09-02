/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToastStatus } from "@/types/enums/toast.enum";

export interface IToastState {
  isShowing: boolean;
  message: string;
  portalId: string;
  status: ToastStatus
}

const initialState: IToastState = {
  isShowing: false,
  message: "",
  portalId: "toast-portal",
  status: "SUCCESS",
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
    setStatus: (state, action: PayloadAction<ToastStatus>) => {
      state.status = action.payload;
    },
  },
});

export const {
  setShow, setToastMessage, setProtalId, setStatus,
} = toastSlice.actions;

export default toastSlice.reducer;
