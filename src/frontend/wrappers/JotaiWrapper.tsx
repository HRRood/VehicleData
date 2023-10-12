"use client";

import { Provider, createStore } from "jotai";

interface JotaiWrapperProps {
  children: React.ReactNode;
}

export const JotaiWrapper = ({ children }: JotaiWrapperProps) => {
  const jotaiStore = createStore();

  return <Provider store={jotaiStore}>{children}</Provider>;
};
