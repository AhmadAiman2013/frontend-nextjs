import {create} from "zustand";

type State = {
    editing: boolean
    editingId: string;
}

type Action = {
    setEditing: (editing: State['editing']) => void;
    setEditingId: (editingId: State['editingId']) => void;
}


export const useEditingStore = create<State & Action>((set) => ({
    editingId: "",
    editing: false,
    setEditing: (editing) => set(() => ({editing: editing})),
    setEditingId: (editingId) => set(() => ({editingId: editingId})),
}));