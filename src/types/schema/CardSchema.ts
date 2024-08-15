import * as v from 'valibot';

export const CardDataSchema = v.object({
    boardId: v.pipe(v.string(), v.nonEmpty('Board ID is required')),
    title: v.pipe(v.string(), v.nonEmpty('Title is required'), v.maxLength(50, 'The title must not exceed 50 characters.')),
})

export type CardData = v.InferOutput<typeof CardDataSchema>;