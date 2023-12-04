import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Bear {
  id: number;
  name: string;
}

interface Bears {
  blackBears: number;
  polarBears: number;
  pandaBears: number;
  bears: Bear[];
  totalBears: () => number;
  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;
  doNothing: () => void;
  addBear: () => void;
  claerBears: () => void;
}

export const useBearsStore = create<Bears>()(
  persist(
    (set, get,) => ({
      blackBears: 0,
      polarBears: 0,
      pandaBears: 0,
      bears: [{ id: 1, name: "Oso #1" }],
      totalBears: () => {
        return (
          get().blackBears +
          get().polarBears +
          get().pandaBears +
          get().bears.length
        );
      },

      increaseBlackBears: (by: number) =>
        set((state) => ({ blackBears: state.blackBears + by })),
      increasePolarBears: (by: number) =>
        set((state) => ({ polarBears: state.polarBears + by })),
      increasePandaBears: (by: number) =>
        set((state) => ({ pandaBears: state.pandaBears + by })),
      doNothing: () => set((state) => ({ bears: [...state.bears] })),
      addBear: () =>
        set((state) => ({
          bears: [
            ...state.bears,
            {
              id: state.bears.length + 1,
              name: `Oso #${state.bears.length + 1}`,
            },
          ],
        })),
      claerBears: () => set({ bears: [] }),
    }),
    { name: "bear-store" }
  )
);
