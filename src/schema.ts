import { z } from "zod";

export const createUpdatePostSchema = z.object({
    title: z.string().min(1),
    author: z.string().min(1)
})

const postSchema = createUpdatePostSchema.extend({
    id: z.number(),
})

export type Post = z.infer<typeof postSchema>;

export type NewPost = z.infer<typeof createUpdatePostSchema>