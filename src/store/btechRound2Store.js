import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const useResultStore = create(
  persist(
    (set) => ({
      result: null,

      // set data
      setResult: (data) => set({ result: data }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: 'btech2Result', // key in sessionStorage
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useResultStore;
