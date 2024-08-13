import axios from "@/lib/axios";
import { BoardIdType } from "@/types/Board";
import { TaskData } from "@/types/schema/TaskSchema";
import { TaskResponse, TaskType } from "@/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { is } from "valibot";

interface TaskProps {
  boardId?: string;
  id?: string;
}

// create task mutation
export const useTask = ({ boardId, id }: TaskProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createTaksMutation, isPending : isPendingCreate } = useMutation({
    mutationFn: async (data: TaskData) => {
      const response = await axios.post<{ data: TaskType }>(
        `/api/cards/${data.cardId}/tasks`,
        data
      );
      return { data: response.data.data };
    },
    onSuccess: (newTask) => {
      queryClient.setQueryData(
        ["board", boardId],
        (oldData: { data: BoardIdType }) => {
          if (!oldData)
            return {
              data: {
                cards: [{ id: newTask.data.card_id, tasks: [newTask.data] }],
              },
            };
          const newCards = oldData.data.cards.map((card) => {
            if (card.id === newTask.data.card_id) {
              return { ...card, tasks: [...card.tasks, newTask.data] };
            }
            return card;
          });
          return { data: { cards: newCards } };
        }
      );
    },
  });

  // create task
  const createCard = async (data: TaskData): Promise<TaskResponse> => {
    try {
        return await createTaksMutation(data);
    } catch (error) {
        console.error("create task failed");
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

  // update task mutation
  const { mutateAsync: updateTaskMutation, isPending : isPendingUpdate } = useMutation({
    mutationFn: async (data: TaskData) => {
        const response = await axios.put<{data : TaskType}>(`/api/cards/${data.cardId}/tasks/${id}`, data);
        return {data: response.data.data};
    },
    onSuccess: (newTask) => {
        queryClient.setQueryData(["board", boardId], (oldData : {data : BoardIdType}) => {
            if (!oldData) return { data: { cards: [{ id: newTask.data.card_id, tasks: [newTask.data] }] } };
            const newCards = oldData.data.cards.map((card) => {
                if (card.id === newTask.data.card_id) {
                    return { ...card, tasks: card.tasks.map((task) => {
                        if (task.id === id) {
                            return newTask.data;
                        }
                        return task;
                    }) };
                }
                return card;
            });
            return { data: { cards: newCards } };
        });
    }
  })
  // update task
  const updateTask = async (data: TaskData): Promise<TaskResponse> => {
    try {
        return await updateTaskMutation(data);
    } catch (error) {
        console.error("update task failed");
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

  // delete task mutation
  const { mutateAsync: deleteTaskMutation, isPending: isPendingDelete } = useMutation({
    mutationFn: async (cardId: Pick<TaskData, "cardId">) => {
        await axios.delete(`/api/cards/${cardId}/tasks/${id}`);
    },
    onSuccess: (_, variables) => {
        queryClient.setQueryData(["board", boardId], (oldData : {data : BoardIdType}) => {
            if (!oldData) return ;
            return {
                data: {
                    ...oldData.data,
                    cards: oldData.data.cards.map((card) => {
                        if (card.id === variables.cardId) {
                            return { ...card, tasks: card.tasks.filter((task) => task.id !== id) };
                        }
                        return card;
                    }),
                }
            }
        });
    }
  })

  // delete task
    const deleteTask = async (cardId: Pick<TaskData, "cardId">) => {
        try {
            await deleteTaskMutation(cardId);
        } catch (error) {
            console.error("delete task failed");
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

  return {
    createCard,
    updateTask,
    deleteTask,
    isPendingCreate,
    isPendingUpdate,
    isPendingDelete
  }
};
