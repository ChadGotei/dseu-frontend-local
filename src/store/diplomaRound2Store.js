  import { create } from 'zustand';
  import { createJSONStorage, persist } from 'zustand/middleware';

  const useDiplomaRound2ResultStore = create(
    persist(
      (set) => ({
        result: null,
        setResult: (data) => set({ result: data }),
        clearResult: () => set({ result: null }),
      }),
      {
        name: 'studentResultDiploma2',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );

  export default useDiplomaRound2ResultStore;