/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlertModalProps } from "@/components/common/Modals/AlertModal/AlertModal";

export interface IAlertModalState {
  isShowing: boolean;
  props: Omit<AlertModalProps, "open" | "onClose"> | null;
}

const initialState: IAlertModalState = {
  isShowing: false,
  props: null,
};

export const alertModalSlice = createSlice({
  name: "alertModal",
  initialState,
  reducers: {
    setShow: (state, action: PayloadAction<boolean>) => {
      state.isShowing = action.payload;
    },
    setProps: (state, action: PayloadAction<Omit<AlertModalProps, "open" | "onClose">>) => {
      state.props = action.payload;
    },
    resetAll: (state) => {
      state.isShowing = false;
      state.props = null;
    },
  },
});

export const { setShow, setProps, resetAll } = alertModalSlice.actions;

export default alertModalSlice.reducer;
