/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
  member: {
    email: string,
    loginId: string,
    profileImage: string | null
    type: "SUPER_ADMIN" | "ADMIN" | "ARTIST",
  },
  jwtInformation: {
    accessToken: string
  }
}

const initialState: IUserState = {
  member: {
    email: "bluekey@gmail.com",
    loginId: "bluekey",
    type: "ARTIST",
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
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
