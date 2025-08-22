  import { create } from 'zustand';
  import { createJSONStorage, persist } from 'zustand/middleware';

  const useDiplomaRound3ResultStore = create(
    persist(
      (set) => ({
        result: null,
        setResult: (data) => set({ result: data }),
        clearResult: () => set({ result: null }),
      }),
      {
        name: 'studentResultDiploma3',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );

  export default useDiplomaRound3ResultStore;