import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
// import { customSessionStorage } from "../storages/customSessionStorage";
import { firebaseStorage } from "../storages/firebaseStorage";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface MethodStore {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<
  PersonState & MethodStore,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  setFirstName: (value: string) =>
    set(() => ({ firstName: value }), false, "setFirstName"),
  setLastName: (value: string) =>
    set(() => ({ lastName: value }), false, "setLastName"),
});

export const usePersonStore = create<PersonState & MethodStore>()(
    devtools(
      persist(storeApi, {
        name: "person-storage",
        // storage: customSessionStorage,
        storage: firebaseStorage,
      })
    )
);
