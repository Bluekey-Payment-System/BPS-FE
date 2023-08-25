import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* eslint-disable no-param-reassign */

import { IAdminProfile, IArtistProfile } from "@/types/dto";

export type MemberProfile = IArtistProfile | IAdminProfile;
export interface IUserState {
  member : MemberProfile
}

const initialState = {
  member: {
    memberId: -1,
    email: "bluekey@gmail.com",
    loginId: "bluekey",
    role: "ADMIN",
    type: "ADMIN",
    nickname: "김관리자",
    profileImage: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState as { member: MemberProfile },
  reducers: {
    setUser: (state, action: PayloadAction<MemberProfile>) => {
      state.member = action.payload;
    },
    resetUser: (state) => {
      state.member = {
        memberId: -1,
        email: "",
        loginId: "",
        type: "ADMIN",
        role: "ADMIN",
        nickname: "",
        profileImage: null,
      };
      sessionStorage.removeItem("persist:root");
      // eslint-disable-next-line no-void
      void state;
    },
  },
});

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
