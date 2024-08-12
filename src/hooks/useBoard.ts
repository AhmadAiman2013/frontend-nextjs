import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BoardCreateResponse,
  BoardIdResponse,
  BoardIdType,
  BoardResponse,
} from "@/types/Board";
import { BoardType } from "@/types/Board";
import { AxiosError } from "axios";
import axios from "@/lib/axios";
import { BoardData } from "@/types/schema/BoardSchema";
import { useEditStore } from "@/utils/board-store-provider";

interface BoardProps {
  id?: string;
  pathname?: string;
}

export const useBoard = ({ id, pathname }: BoardProps) => {
  const queryClient = useQueryClient();
  const { isEditing, startEditing, stopEditing} = useEditStore(
    (state) => state,
  )


  // fetch all boards
  const { data: boards, isLoading: isLoadingBoards } = useQuery<BoardResponse>(
    {
      queryKey: ["boards"],
      queryFn: async (): Promise<BoardResponse> => {
        try {
          const response = await axios.get<{ data: BoardType[] }>(
            "/api/boards"
          );
          return { data: response.data.data };
        } catch (error) {
          console.error("Boards failed to retrived");
          if (error instanceof AxiosError && error.response) {
            return {
              error:
                error.response.data.message || "An unexpected error occurred",
            };
          }
          return {
            error: "An unexpected error occurred",
          };
        }
      },
      staleTime: 10 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  // fetch individual board
  const { data: board, isLoading: isLoadingBoard } = useQuery<BoardIdResponse>({
    queryKey: ["board", id],
    queryFn: async (): Promise<BoardIdResponse> => {
      try {
        const response = await axios.get<{ data: BoardIdType }>(
          `/api/boards/${id}`
        );
        return { data: response.data.data };
      } catch (error) {
        console.error("Board failed to retrived");
        if (error instanceof AxiosError && error.response) {
          return {
            error:
              error.response.data.message || "An unexpected error occurred",
          };
        }
        return {
          error: "An unexpected error occurred",
        };
      }
    },
    staleTime: 10 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id && (pathname === `/dashboard/${id}`)
  });

  // create board mutation
  const createBoardMutation = useMutation({
    mutationFn: async (data: BoardData) => {
      const response = await axios.post<{data : BoardType }>("/api/boards", data);
      return {data: response.data.data};
    },
    onSuccess: (newBoard) => {
      queryClient.setQueryData(["boards"], (oldData : {data : BoardType[]}) => {
        if (!oldData) return { data: [newBoard.data] };
        return { data: [newBoard.data, ...oldData.data, ] };
      });
    },
  });

  // create board
  const createBoard = async (data: BoardData): Promise<BoardCreateResponse> => {
    try {
      return await createBoardMutation.mutateAsync(data);
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

  // update board
  const {mutateAsync : updateBoardMutation , isPending : isPendingUpdate} = useMutation({
    mutationFn: async (data: BoardData) => {
      const response = await axios.put<{data : BoardType}>(`/api/boards/${id}`, data);
      return {data: response.data.data};
    },
    onSuccess: (newBoard) => {
      queryClient.setQueryData(["boards"], (oldData : {data : BoardType[]}) => {
        if (!oldData) return { data: [newBoard.data] };
        return { data: oldData.data.map((board) => {
          if (board.id === id) {
            return newBoard.data;
          }
          return board;
        }) };
      });
      queryClient.setQueryData(["board", id], (oldData : {data: BoardType[]}) => {
        if (!oldData) return { data: newBoard.data };
        return { data: {...oldData, title: newBoard.data.title} };
      });
    },
  });

  const updateBoard = async (data: BoardData): Promise<BoardCreateResponse> => {
    try {
      return await updateBoardMutation(data);
    } catch (error) {
      console.error("update board failed");
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
  // delete board
  const {mutateAsync : deleteBoardMutation, isPending : isPendingDelete} = useMutation({
    mutationFn: async () =>  await axios.delete(`/api/boards/${id}`),
    onSuccess: () => {
      queryClient.setQueryData(["boards"], (oldData : {data : BoardType[]}) => {
        if (!oldData) return { data: [] };
        return { data: oldData.data.filter((board) => board.id !== id) };
      });
      queryClient.removeQueries({ queryKey: ["board", id] });
     }
    
  })

  const deleteBoard = async () => {
    try {
      await deleteBoardMutation();
    } catch (error) {
      console.error("delete board failed");
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
    boards,
    board,
    createBoard,
    updateBoard,
    deleteBoard,
    isLoadingBoard,
    isLoadingBoards,
    isPendingUpdate,
    isPendingDelete,
    startEditing,
    stopEditing,
    isEditing
  };
};
