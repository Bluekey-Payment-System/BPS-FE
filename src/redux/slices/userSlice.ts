/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberType } from "@/types/enums/user.enum";

export interface IUserState {
  member: {
    email: string,
    loginId: string,
    profileImage: string | null
    type: MemberType,
  } | null,
}

const initialState: IUserState = {
  member: {
    email: "bluekey@gmail.com",
    loginId: "bluekey",
    type: "SUPER_ADMIN",
    profileImage: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.member = action.payload.member;
    },
    resetUser: (state) => {
      state.member = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
