  import { create } from 'zustand';
  import { createJSONStorage, persist } from 'zustand/middleware';

  const useDiplomaRound4ResultStore = create(
    persist(
      (set) => ({
        result: null,
        setResult: (data) => set({ result: data }),
        clearResult: () => set({ result: null }),
      }),
      {
        name: 'studentResultDiploma4',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  );

  export default useDiplomaRound4ResultStore;