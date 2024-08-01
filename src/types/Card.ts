import { TaskType } from "./Task"

export type CardType = {
    id: string;
    boards_id: number;
    title : string;
    order: number;
    created_at: Date;
    updated_at: Date;
    tasks : TaskType[]
}