import * as v from 'valibot';

export const TaskDataSchema = v.object({
    cardId: v.pipe(v.string(), v.nonEmpty('Card ID is required')),
    title: v.pipe(v.string(), v.nonEmpty('Title is required'), v.maxLength(50, 'The title must not exceed 50 characters.')),
    completed: v.optional(v.boolean('Completed must be a boolean')),
})

export type TaskData = v.InferOutput<typeof TaskDataSchema>;