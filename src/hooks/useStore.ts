import { createStore } from "zustand/vanilla";


export type State = {
    editingStates: {
        [pageRoute: string]: {
            [boardId: string]: boolean;
        }
    };
}

export type Actions = {
    startEditing: (args: { pageRoute: string, id: string }) => void;
    stopEditing: (args: { pageRoute: string, id: string }) => void;
    isEditing: (args: { pageRoute: string, id: string }) => boolean;
}

export type EditStore = State & Actions

export const defaultInitState: State = {
    editingStates: {},
}

export const createEditStore = (initState: State = defaultInitState) => {
    return createStore<EditStore>()((set, get) => ({
        ...initState,
        startEditing: ({ pageRoute, id}) => set((state) => ({
            editingStates: {
                ...state.editingStates,
                [pageRoute]: {
                    ...state.editingStates[pageRoute],
                    [id]: true,
                }
            }
        })),
        stopEditing: ({ pageRoute, id}) => set((state) => ({
            editingStates: {
                ...state.editingStates,
                [pageRoute]: {
                    ...state.editingStates[pageRoute],
                    [id]: false,
                }
            }
        })),
        isEditing: ({ pageRoute, id}) => {
            const state = get().editingStates;
            return state[pageRoute] && state[pageRoute][id];
        },
    }))
}