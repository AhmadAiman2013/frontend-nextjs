import axios from "@/lib/axios";
import { BoardIdType } from "@/types/Board";
import { TaskData } from "@/types/schema/TaskSchema";
import { TaskResponse, TaskType } from "@/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEditStore } from "@/utils/board-store-provider";

interface TaskProps {
  boardId?: string;
  id?: string;
}

// create task mutation
export const useTask = ({ boardId, id }: TaskProps) => {
  const queryClient = useQueryClient();
  const { isEditingTask, startEditingTask, stopEditingTask } = useEditStore(
    (state) => state
  );

  const { mutateAsync: createTaksMutation, isPending: isPendingCreate } =
    useMutation({
      mutationFn: async (data: TaskData) => {
        const response = await axios.post<{ data: TaskType }>(
          `/api/cards/${data.cardId}/tasks`,
          data
        );
        return { data: response.data.data };
      },
      onMutate: async (newTask: TaskData) => {
        await queryClient.cancelQueries({ queryKey: ["board", boardId] });

        const previousBoard = queryClient.getQueryData<{ data: BoardIdType }>([
          "board",
          boardId,
        ]);

        queryClient.setQueryData(
          ["board", boardId],
          (oldData: { data: BoardIdType }) => {
            if (!oldData) return;
            const newCards = oldData.data.cards.map((card) => {
              if (card.id === newTask.cardId) {
                return {
                  ...card,
                  tasks: [
                    ...card.tasks,
                    { id: "temp-id", card_id: newTask.cardId, ...newTask },
                  ],
                };
              }
              return card;
            });
            return {
              data: {
                ...oldData.data,
                cards: newCards,
              },
            };
          }
        );

        return { previousBoard };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(["board", boardId], context?.previousBoard);
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
                return {
                  ...card,
                  tasks: card.tasks.map((task) =>
                    task.id === "temp-id" ? newTask.data : task
                  ),
                };
              }
              return card;
            });
            return {
              data: {
                ...oldData.data,
                cards: newCards,
              },
            };
          }
        );
      },
    });

  // create task
  const createTask = async (data: TaskData): Promise<TaskResponse> => {
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
  };

  // update task mutation
  const { mutateAsync: updateTaskMutation, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: async (data: TaskData) => {
        const response = await axios.put<{ data: TaskType }>(
          `/api/cards/${data.cardId}/tasks/${id}`,
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
                return {
                  ...card,
                  tasks: card.tasks.map((task) => {
                    if (task.id === id) {
                      return newTask.data;
                    }
                    return task;
                  }),
                };
              }
              return card;
            });
            return { data: { cards: newCards } };
          }
        );
      },
    });
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
  };

  // delete task mutation
  const { mutateAsync: deleteTaskMutation, isPending: isPendingDelete } =
    useMutation({
      mutationFn: async (data: Pick<TaskData, "cardId">) => {
        await axios.delete(`/api/cards/${data.cardId}/tasks/${id}`);
      },
      onMutate: async (data: Pick<TaskData, "cardId">) => {
        await queryClient.cancelQueries({ queryKey: ["board", boardId] });

        const previousBoard = queryClient.getQueryData<{ data: BoardIdType }>([
          "board",
          boardId,
        ]);

        queryClient.setQueryData(
          ["board", boardId],
          (oldData: { data: BoardIdType }) => {
            if (!oldData) return;
            const deletedTaskOrder =
              oldData.data.cards
                .find((card) => card.id === data.cardId)
                ?.tasks.find((task) => task.id === id)?.order || 0;
            return {
              data: {
                ...oldData.data,
                cards: oldData.data.cards.map((card) => {
                  if (card.id === data.cardId) {
                    return {
                      ...card,
                      tasks: card.tasks
                        .filter((task) => task.id !== id)
                        .map((task) => ({
                          ...task,
                          order:
                            task.order > deletedTaskOrder
                              ? task.order - 1
                              : task.order,
                        })),
                    };
                  }
                  return card;
                }),
              },
            };
          }
        );

        return { previousBoard };
      },
      onError: (error, variables, context) => {
        queryClient.setQueryData(["board", boardId], context?.previousBoard);
      },
    });

  // delete task
  const deleteTask = async (data: Pick<TaskData, "cardId">) => {
    try {
      await deleteTaskMutation(data);
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
  };

  return {
    createTask,
    updateTask,
    deleteTask,
    isPendingCreate,
    isPendingUpdate,
    isPendingDelete,
    startEditingTask,
    stopEditingTask,
    isEditingTask,
  };
};
