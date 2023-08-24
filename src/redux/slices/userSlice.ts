/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MemberType } from "@/types/enums/user.enum";

export interface IUserState {
  member: {
    email: string,
    loginId: string,
    profileImage: string | null,
    nickName?: string,
    name?: string,
    enName?: string,
    type: MemberType,
  } | null,
  jwtInformation: {
    accessToken: string
  } | null
}

const initialState: IUserState = {
  member: {
    email: "bluekey@gmail.com",
    loginId: "bluekey",
    type: "SUPER_ADMIN",
    nickName: "김관리자",
    name: "혁기",
    enName: "hucki",
    profileImage: null,
  },
  jwtInformation: {
    accessToken: "asdfasdf",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.member = action.payload.member;
      state.jwtInformation = action.payload.jwtInformation;
    },
    resetUser: (state) => {
      state.member = null;
      state.jwtInformation = null;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
