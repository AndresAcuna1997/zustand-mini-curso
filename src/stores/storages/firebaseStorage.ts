import { StateStorage, createJSONStorage } from "zustand/middleware";

const firebaseUrl =
  "https://zustand-storage-acu19-default-rtdb.firebaseio.com/zustand";

const fireBaseApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then((res) =>res.json());
      return JSON.stringify(data);
    } catch (error) {
      throw new Error("No se pudo obtener la data de Firebase");
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    await fetch(`${firebaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log(name);
  },
};

export const firebaseStorage = createJSONStorage(() => fireBaseApi);
