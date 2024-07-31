export type TaskType = {
    id: number;
    card_id : number;
    title: string;
    order: number;
    completed: boolean;
    created_at: Date;
    updated_at: Date;
}