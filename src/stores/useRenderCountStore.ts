import { create } from "zustand";

interface RenderCountStore {
  renderCounts: { [key: string]: number };
  incrementRenderCount: (componentName: string) => void;
}

const useRenderCountStore = create<RenderCountStore>((set) => {
  const storedRenderCounts = JSON.parse(localStorage.getItem("renderCounts") || "{}");

  return {
    renderCounts: storedRenderCounts,
    incrementRenderCount: (componentName) => {
      set((state) => {
        const newRenderCounts = { ...state.renderCounts, [componentName]: (state.renderCounts[componentName] || 0) + 1 };

        localStorage.setItem("renderCounts", JSON.stringify(newRenderCounts));

        return { renderCounts: newRenderCounts };
      });
    },
  };
});

export default useRenderCountStore;
