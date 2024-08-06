import * as v from 'valibot';

export const BoardDataSchema = v.object({
    title: v.pipe(v.string(), v.nonEmpty('Title is required'), v.maxLength(50, 'The title must not exceed 50 characters.')),
})

export type BoardData = v.InferOutput<typeof BoardDataSchema>;


