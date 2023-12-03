/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AnyAction,
  Action,
  configureStore,
  ThunkAction,
  Store,
  combineReducers,
  PreloadedState,
  Reducer,
} from "@reduxjs/toolkit";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import {
  persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

import alertModalReducer, { IAlertModalState } from "@/redux/slices/alertModalSlice";
import toastReducer, { IToastState } from "@/redux/slices/toastSlice";
import userReducer, { IUserState } from "@/redux/slices/userSlice";

import uploadRevenueAlertModalReducer, { IUploadRevenueAlertModalState } from "./slices/uploadRevenueAlertModalSlice";

export interface IState {
  toast: IToastState;
  user: IUserState;
  alertModal: IAlertModalState;
  uploadRevenueAlertModal: IUploadRevenueAlertModalState
}

const createNoopStorage = () => {
  return {
    getItem(key: string) {
      return Promise.resolve(null);
    },
    setItem(key: string) {
      return Promise.resolve();
    },
    removeItem(key: string) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window === "undefined"
  ? createNoopStorage()
  : createWebStorage("local");

const rootReducer = (state: IState | undefined, action: AnyAction): IState => {
  switch (action.type) {
    case HYDRATE:
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return { ...state, ...action.payload };
    default: {
      const combinedReducer = combineReducers({
        toast: toastReducer,
        alertModal: alertModalReducer,
        user: userReducer,
        uploadRevenueAlertModal: uploadRevenueAlertModalReducer,
      });
      return combinedReducer(state, action);
    }
  }
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer<RootReducer>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    preloadedState,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ serializableCheck: false });
    },
  });
};

const setupAppStore = () => { return store; };

const makeStore = () => { return setupAppStore(); };

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof makeStore>;
export type TestStore = ReturnType<typeof setupStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type RootReducer = ReturnType<typeof rootReducer>;

// eslint-disable-next-line max-len
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
