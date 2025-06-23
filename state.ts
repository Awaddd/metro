import { create } from "zustand";

type StoreState = {
  date: Date | undefined;
  updateDate: (month: Date) => void;
};

export const useCtx = create<StoreState>((set) => ({
  date: undefined,
  updateDate: (date) => set(() => ({ date: date })),
}));
