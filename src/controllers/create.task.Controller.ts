import {prisma} from "../lib/prisma";
import  {Request, Response} from "express";
import {TaskSchema} from "../Schema/schema";


export  default async function createTaskController(req: Request, res: Response) {


        try {

            const task = TaskSchema.safeParse(req.body);

            if (task.error) {
                console.log(task.error.message);
                return res.status(400).json({
                    error: "format invalid",
                    status: false
                })
            }

            // rear la area en la base de dates

            const {title,descripcion} = task.data;

          const insert_task = await prisma.task.create({
               data: {
                    title,
                    descripcion,
                   user: {
                       connect: {
                           id:req.user?.id
                        },
                   },
                },
            })

            //console.log(insert_task);

            res.status(200).json({
                status: "success",
                message: "Task Created",
            })

        }catch (error) {
            console.log(error);
            return res.status(400).json({
                error: "error intern del server",
            })
        }

}
