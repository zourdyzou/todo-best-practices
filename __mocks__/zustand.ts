import { act } from "@testing-library/react";
import { afterEach } from "node:test";
import { vi } from "vitest";
import type * as ZustandExportedTypes from "zustand";
export * from "zustand";

const { create: actualCreate } =
  await vi.importActual<typeof ZustandExportedTypes>("zustand");

// a variable to hold reset functions for all stores declared in the app
export const storeResetFns = new Set<() => void>();

const createUncurried = <T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
export const create = (<T>(
  stateCreator: ZustandExportedTypes.StateCreator<T>,
) => {
  // to support curried version of create
  return typeof stateCreator === "function"
    ? createUncurried(stateCreator)
    : createUncurried;
}) as typeof ZustandExportedTypes.create;

// reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});
