/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { PreloadedState } from "@reduxjs/toolkit";
import type { RenderOptions } from "@testing-library/react";

import React, { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

import {
  setupStore, type RootState, TestStore,
} from "@/redux/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>
  store?: TestStore
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  const queryClient = new QueryClient({
    logger: {
      // eslint-disable-next-line no-console
      log: console.log,
      warn: console.warn,
      error: () => { },
    },
    defaultOptions: {
      queries: {
        retry: 0,
        cacheTime: Infinity,
      },
    },
  });
  const Wrapper = ({ children }: PropsWithChildren<object>): JSX.Element => {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  };

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export const delay = async (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export { renderWithProviders as render };
