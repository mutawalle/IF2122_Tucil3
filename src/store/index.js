import { create } from "zustand";

export const useAppStore = create((set) => ({
    useMap: false,
    matrix: [[]],
    nodes: [],
    canAddNode: true,
    canAddEdge: true,

    setCanAddEdge: (newCanAddEdge) => set((state) => ({canAddEdge: newCanAddEdge})),
    setCanAddNode: (newCanAddNode) => set((state) => ({canAddNode: newCanAddNode})),
    setUseMap: (newUseMap) => set((state) => ({useMap: newUseMap})),
    setMatrix: (newMatrix) => set((state) => ({matrix: newMatrix})),
    setNodes: (newNodes) => set((state) => ({nodes: newNodes})),
}))