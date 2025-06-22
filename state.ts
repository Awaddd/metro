import { create } from "zustand";

type StoreState = {
  date: Date;
  updateDate: (month: Date) => void;
};

export const useCtx = create<StoreState>((set) => ({
  date: new Date(),
  updateDate: (date) => set(() => ({ date: date })),
}));
