export type TaskType = {
    id: string;
    card_id : string;
    title: string;
    order: number;
    completed: boolean ;
    due_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface TaskResponse {
    data?: TaskType
    error?: string
}