import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BoardIdResponse, BoardIdType, BoardResponse } from '@/types/Board';
import { BoardType } from '@/types/Board';
import { AxiosError } from 'axios';
import axios from '@/lib/axios'
import { usePathname } from 'next/navigation';

interface BoardProps {
    id?: string
}

export const useBoard = ({ id } : BoardProps) => {
    const pathname = usePathname()

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
      });
    
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
        enabled: !!id 
      });

    return {
        boards,
        board,
        isLoadingBoard,
        isLoadingBoardId
    }

}