import {prisma} from "../lib/prisma";
import {Request, Response} from "express";

export default async function getAllTaskController(req: Request, res: Response) {


    try {
            const task= await prisma.task.findMany({
                where:{
                    userId: req.user?.id
                }
            })

        if (!task.length) {
            return res.status(404).json({
                message: "Task not found",
                status: false
            })
        }

        res.status(200).json({
            status: "success",
            task: task,
        })

    }catch (error) {
        if (error instanceof Error) {

            console.error(error.message);

            res.status(500).json({
                status: false,
                message: "error intern del server",
            })
        }

    }

}