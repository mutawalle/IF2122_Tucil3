import { create } from "zustand";

export const useAppStore = create((set) => ({
    useMap: false,
    matrix: [[]],
    nodes: [],
    setUseMap: (newUseMap) => set((state) => ({useMap: newUseMap})),
    setMatrix: (newMatrix) => set((state) => ({matrix: newMatrix})),
    setNodes: (newNodes) => set((state) => ({nodes: newNodes})),
}))