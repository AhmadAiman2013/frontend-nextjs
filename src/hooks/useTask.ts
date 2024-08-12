import axios from "@/lib/axios";
import { TaskData } from "@/types/schema/TaskSchema";
import { TaskType } from "@/types/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface TaskProps {
    boardId?: string;
    cardId?: string;
}

export const useTask = ({boardId, cardId} : TaskProps) => {
    const queryClient = useQueryClient();

    const {mutateAsync : create, isPending} = useMutation({
        mutationFn: async (data: TaskData) => {
            const response = await axios.post<{data : TaskType}>(`/api/cards/${data.cardId}/tasks`, data);
            return {data: response.data.data};
        },
        onSuccess: (newTask) => {

        }
    })

}