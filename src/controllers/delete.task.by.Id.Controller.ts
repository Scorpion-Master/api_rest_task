import {Request, Response} from "express";
import {prisma} from "../lib/prisma";

export  default async function deleteTaskByIdController(req:Request,res:Response){
    try {
        const idparam: string = req.params.id;

        const id: number = Number(idparam);

        if (isNaN(id)){
            return res.status(400).json({
                message: 'Invalid ID number',
                status: false
            })
        }

        const data = await prisma.task.findFirst({
            where: {
                id: id,
                userId: req.user?.id
            }
        })

        if (!data){
            return res.status(403).json({
                status: false,
                error: "forbidden"
            })
        }

        const delete_task = await prisma.task.delete({
            where:{
                id: id,
                userId: req.user?.id
            }
        })

        res.status(200).json({
            status: true,
            message: "Task deleted successfully",
        })


    }catch (error){
        if (error instanceof Error){
            console.log(error.message);
            res.status(500).json({
                error: "error interno del sevidor",
                status: false
            });
        }
    }
}