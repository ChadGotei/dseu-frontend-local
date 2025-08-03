import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const usePgResultStore = create(
  persist(
    (set) => ({
      result: null,
      setResult: (data) => set({ result: data }),
      clearResult: () => set({ result: null }),
    }),
    {
      name: 'studentResultPG', // seperating the key to prevent conflicts
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default usePgResultStore;