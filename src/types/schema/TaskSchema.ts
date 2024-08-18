import * as v from 'valibot';

export const TaskDataSchema = v.object({
    cardId: v.pipe(v.string(), v.nonEmpty('Card ID is required')),
    title: v.pipe(v.string(), v.nonEmpty('Title is required'), v.maxLength(50, 'The title must not exceed 50 characters.')),
})

export const TaskEditDataSchema = v.object({
    ...v.partial(TaskDataSchema, ['title']).entries,
    ...v.object({
        completed: v.optional(v.boolean('Completed must be a boolean')),
        due_date: v.optional(v.date('Due date must be a date')),
    }).entries
})

export type TaskData = v.InferOutput<typeof TaskDataSchema>;

export type TaskEditData = v.InferOutput<typeof TaskEditDataSchema>;