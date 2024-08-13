import axios from "@/lib/axios";
import { BoardIdType } from "@/types/Board";
import { CardResponse, CardType } from "@/types/Card";
import { CardData } from "@/types/schema/CardSchema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEditStore } from "@/utils/board-store-provider";

export const useCard = ({ id }: { id?: string }) => {
  const queryClient = useQueryClient();
  const { isEditingCard, startEditingCard, stopEditingCard } = useEditStore(
    (state) => state
  );

  // create card mutation
  const { mutateAsync: createCardMutation, isPending: isPendingCreate } =
    useMutation({
      mutationFn: async (data: CardData) => {
        const response = await axios.post<{ data: CardType }>(
          `/api/boards/${data.boardId}/cards`,
          data
        );
        return { data: response.data.data };
      },
      onSuccess: (newCard) => {
        queryClient.setQueryData(
          ["board", newCard.data.boards_id],
          (oldData: { data: BoardIdType }) => {
            if (!oldData) return { data: { cards: [newCard.data] } };
            return {
              data: {
                ...oldData.data,
                cards: [...oldData.data.cards, newCard.data],
              },
            };
          }
        );
      },
    });
  // create card
  const createCard = async (data: CardData): Promise<CardResponse> => {
    try {
      return await createCardMutation(data);
    } catch (error) {
      console.error("create board failed");
      if (error instanceof AxiosError && error.response) {
        return {
          error: error.response.data.message || "An unexpected error occurred",
        };
      }
      return {
        error: "An unexpected error occurred",
      };
    }
  };
  // update card mutation
  const { mutateAsync: updateCardMutation, isPending : isPendingUpdate } = useMutation({
    mutationFn: async (data: CardData) => {
        const response = await axios.put<{data : CardType}>(`/api/boards/${data.boardId}/cards/${id}`, data);
        return {data: response.data.data};
    },
    onSuccess: (newCard) => {
        queryClient.setQueryData(["board", newCard.data.boards_id], (oldData : {data : BoardIdType}) => {
            if (!oldData) return { data: { cards: [newCard.data] } };
            return {
                data: {
                    ...oldData.data,
                    cards: oldData.data.cards.map((card) => {
                        if (card.id === id) {
                            return newCard.data;
                        }
                        return card;
                    }),
                },
            };
        });
    }
  })
  // update
  const updateCard = async (data: CardData): Promise<CardResponse> => {
    try {
      return await updateCardMutation(data);
    } catch (error) {
      console.error("update card failed");
      if (error instanceof AxiosError && error.response) {
        return {
          error: error.response.data.message || "An unexpected error occurred",
        };
      }
      return {
        error: "An unexpected error occurred",
      };
    }
  }

  //delete card mutation
  const { mutateAsync: deleteCardMutation, isPending: isPendingDelete } =
    useMutation({
      mutationFn: async (boardId: Pick<CardData, "boardId">) =>
        await axios.delete(`/api/boards/${boardId}/cards/${id}`),
      onSuccess: (_, variables) => {
        queryClient.setQueryData(
          ["board", variables.boardId],
          (oldData: { data: BoardIdType }) => {
            if (!oldData) return;
            return {
              data: {
                ...oldData.data,
                cards: oldData.data.cards.filter((card) => card.id !== id),
              },
            };
          }
        );
      },
    });
  //delete card
  const deleteCard = async (boardId: Pick<CardData, "boardId">) => {
    try {
      await deleteCardMutation(boardId);
    } catch (error) {
      console.error("delete card failed");
      if (error instanceof AxiosError && error.response) {
        return {
          error: error.response.data.message || "An unexpected error occurred",
        };
      }
      return {
        error: "An unexpected error occurred",
      };
    }
  };

  return {
    createCard,
    updateCard,
    deleteCard,
    isPendingCreate,
    isPendingUpdate,
    isPendingDelete,
    startEditingCard,
    stopEditingCard,
    isEditingCard
  };
};
