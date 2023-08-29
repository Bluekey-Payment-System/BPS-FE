/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// import { AlertModalProps } from "@/components/common/Modals/AlertModal/AlertModal";
import { UploadRevenueAlertModalProps } from "@/components/upload-revenue/UploadRevenueAlertModal/UploadRevenueAlertModal";

type PropsType = (Omit<UploadRevenueAlertModalProps, "open" | "onClose"> & { onClose?: () => void }) | null;

export interface IUploadRevenueAlertModalState {
  isShowing: boolean;
  props: PropsType;
}

const initialState: IUploadRevenueAlertModalState = {
  isShowing: false,
  props: null,
};

export const uploadRevenueAlertModalSlice = createSlice({
  name: "uploadRevenueUploadModal",
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

export const { setShow, setProps, resetAll } = uploadRevenueAlertModalSlice.actions;

export default uploadRevenueAlertModalSlice.reducer;
