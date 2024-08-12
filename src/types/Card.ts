import { TaskType } from "./Task"

export type CardType = {
    id: string;
    boards_id: string;
    title : string;
    order: number;
    created_at: Date;
    updated_at: Date;
    tasks : TaskType[]
}

export interface CardResponse {
    data?: CardType
    error?: string
}