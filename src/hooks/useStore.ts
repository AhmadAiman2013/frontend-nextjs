import {create} from "zustand";

type State = {
    editingId: string;
}

type Action = {
    setEditingId: (editingId: State['editingId']) => void;
}


export const useEditingStore = create<State & Action>((set) => ({
    editingId: "",
    setEditingId: (editingId) => set(() => ({editingId: editingId})),
}));