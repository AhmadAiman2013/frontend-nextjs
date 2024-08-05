import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BoardIdResponse, BoardIdType, BoardResponse } from '@/types/Board';
import { BoardType } from '@/types/Board';
import { AxiosError } from 'axios';
import axios from '@/lib/axios'
import { BoardData } from '@/types/schema/BoardSchema';

interface BoardProps {
    id?: string
}

export const useBoard = ({ id } : BoardProps) => {
  const queryClient = useQueryClient();

  // fetch all boards
    const { data: boards, isLoading : isLoadingBoardId } = useQuery<BoardResponse>({
        queryKey: ["boards"],
        queryFn: async () : Promise<BoardResponse> =>{
          try {
            const response = await axios.get<{ data: BoardType[]}>('/api/boards');
            return { data: response.data.data }
          } catch (error) {
            console.error('Boards failed to retrived')
            if (error instanceof AxiosError && error.response) {
                return {
                  error: error.response.data.message || "An unexpected error occurred",
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
      });
    
    // fetch individual board
    const { data: board, isLoading : isLoadingBoard } = useQuery<BoardIdResponse>({
        queryKey: ["board", id],
        queryFn: async () : Promise<BoardIdResponse> =>{
          try {
            const response = await axios.get<{ data: BoardIdType}>(`/api/boards/${id}`);
            console.log(response.data.data)
            return { data: response.data.data }
          } catch (error) {
            console.error('Board failed to retrived')
            if (error instanceof AxiosError && error.response) {
                return {
                  error: error.response.data.message || "An unexpected error occurred",
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
        enabled: !!id,
      });
    
    // create board mutation
    const createBoardMutation = useMutation({
      mutationFn: async (data: BoardData) => {
        const response = await axios.post('/api/boards', data) 
        return response
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["boards"]})
      }
    })

    // create board
    const createBoard = async (data: BoardData ) => {
      try {
        const response = await createBoardMutation.mutateAsync(data)
        return response
      } catch (error: any) 
        {
          console.error("creat board failed");
          return {
            error: error.response?.data?.message || "An unexpected error occurred",
          };
      }
    }


    // update board
    // delete board

    return {
        boards,
        board,
        createBoard,
        isLoadingBoard,
        isLoadingBoardId
    }

}