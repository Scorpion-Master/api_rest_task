import * as z from "zod";


 export  const UserSchema = z.object({
    name: z.string().max(20).min(4).optional(),
    email: z.email().max(20).min(15),
    password: z.string().max(20).min(8)
})

export  const TaskSchema = z.object({
    title: z.string(),
    descripcion: z.string()
})

export const StateSchema = z.object({
    state: z.string().max(10).min(8),
})




