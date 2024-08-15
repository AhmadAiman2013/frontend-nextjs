import { createStore } from "zustand/vanilla";


export type State = {
    boardEditingStates: {
        [pageRoute: string]: {
            [boardId: string]: boolean;
        }
    };
    cardEditingStates: {
        [cardId: string]: boolean;
    };
    taskEditingStates: {
        [taskId: string]: boolean;
    }
}

export type Actions = {
    startEditingBoard: (args: { pageRoute: string, id: string }) => void;
    stopEditingBoard: (args: { pageRoute: string, id: string }) => void;
    isEditingBoard: (args: { pageRoute: string, id: string }) => boolean;

    startEditingCard: (args : {id: string}) => void;
    stopEditingCard: (args : {id: string}) => void;
    isEditingCard: (args : {id: string}) => boolean;

    startEditingTask: (args : {id: string}) => void;
    stopEditingTask: (args : {id: string}) => void;
    isEditingTask: (args : {id: string}) => boolean;
}

export type EditStore = State & Actions

export const defaultInitState: State = {
    boardEditingStates: {},
    cardEditingStates: {},
    taskEditingStates: {},
}

export const createEditStore = (initState: State = defaultInitState) => {
    return createStore<EditStore>()((set, get) => ({
        ...initState,

        // board
        startEditingBoard: ({ pageRoute, id}) => set((state) => ({
            boardEditingStates: {
                ...state.boardEditingStates,
                [pageRoute]: {
                    ...state.boardEditingStates[pageRoute],
                    [id]: true,
                }
            }
        })),
        stopEditingBoard: ({ pageRoute, id}) => set((state) => ({
            boardEditingStates: {
                ...state.boardEditingStates,
                [pageRoute]: {
                    ...state.boardEditingStates[pageRoute],
                    [id]: false,
                }
            }
        })),
        isEditingBoard: ({ pageRoute, id}) => {
            const state = get().boardEditingStates;
            return state[pageRoute] && state[pageRoute][id];
        },

        // card
        startEditingCard: ({id}) => set((state) => ({
            cardEditingStates: {
                ...state.cardEditingStates,
                [id]: true,
            }
        })),
        stopEditingCard: ({id}) => set((state) => ({
            cardEditingStates: {
                ...state.cardEditingStates,
                [id]: false,
            }
        })),
        isEditingCard: ({id}) => get().cardEditingStates[id],

        // task
        startEditingTask: ({id}) => set((state) => ({
            taskEditingStates: {
                ...state.taskEditingStates,
                [id]: true,
            }
        })),
        stopEditingTask: ({id}) => set((state) => ({
            taskEditingStates: {
                ...state.taskEditingStates,
                [id]: false,
            }
        })),
        isEditingTask: ({id}) => get().taskEditingStates[id],
    }))
}