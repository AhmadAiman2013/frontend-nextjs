import { createStore } from "zustand/vanilla";


export type BoardState = {
    editingStates: {
        [pageRoute: string]: {
            [boardId: string]: boolean;
        }
    };
}

export type BoardsActions = {
    startEditing: (args: { pageRoute: string, id: string }) => void;
    stopEditing: (args: { pageRoute: string, id: string }) => void;
    isEditing: (args: { pageRoute: string, id: string }) => boolean;
}

export type BoardStore = BoardState & BoardsActions

export const defaultInitState: BoardState = {
    editingStates: {},
}

export const createBoardStore = (initState: BoardState = defaultInitState) => {
    return createStore<BoardStore>()((set, get) => ({
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