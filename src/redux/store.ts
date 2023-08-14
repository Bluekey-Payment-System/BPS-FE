import type { PreloadedState } from "@reduxjs/toolkit";

import {
  AnyAction, CombinedState, Reducer, Store, combineReducers, configureStore,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import toastReducer, { IToastState } from "@/redux/slices/toastSlice";
import userReducer, { IUserState } from "@/redux/slices/userSlice";

export interface IState {
  toast: IToastState;
  user: IUserState;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        toast: toastReducer,
        user: userReducer,
      });
      return combinedReducer(state, action);
    }
  }
};
const createStore = () => {
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
  });
  return store;
};

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    preloadedState,
  });
};

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

const wrapper = createWrapper<Store<IState>>(createStore);
export default wrapper;
