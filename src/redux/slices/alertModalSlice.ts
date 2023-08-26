/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AlertModalProps } from "@/components/common/Modals/AlertModal/AlertModal";

type PropsType = (Omit<AlertModalProps, "open" | "onClose"> & { onClose?: () => void }) | null;
export interface IAlertModalState {
  isShowing: boolean;
  props: PropsType;
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
    setProps: (state, action: PayloadAction<PropsType>) => {
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
