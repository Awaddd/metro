import { create } from "zustand";
import { StopSearchData } from "./types/stop-search";

type StoreState = {
  date: Date | undefined;
  updateDate: (month: Date) => void;

  ageRange: StopSearchData["ageRange"] | undefined;
  updateAgeRange: (ageRange: StopSearchData["ageRange"]) => void;

  type: StopSearchData["type"] | undefined;
  updateType: (type: StopSearchData["type"]) => void;
};

export const useCtx = create<StoreState>((set) => ({
  date: undefined,
  updateDate: (date) => set(() => ({ date: date })),

  ageRange: undefined,
  updateAgeRange: (ageRange) => set(() => ({ ageRange })),

  type: undefined,
  updateType: (type) => set(() => ({ type })),
}));
