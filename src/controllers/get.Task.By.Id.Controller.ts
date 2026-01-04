import {prisma} from "../lib/prisma";
import {Request, Response} from "express";


export default async function getTaskByIdController(req: Request, res: Response) {

    try {

        const idParam:string = req.params.id;

        const id: number = Number(idParam);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }


        const task_filter = await prisma.task.findFirst({
            where: {
                id: id,
                userId: req.user?.id
            }
        })

        if (!task_filter) {
            return res.status(400).json({
                message: "Task not found",
                status: false });
        }



        res.status(200).json({
            status: "success",
            task: task_filter
        })

    }catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

            return res.status(500).json({
                message: "error intern del server",
            })
        }
    }




}