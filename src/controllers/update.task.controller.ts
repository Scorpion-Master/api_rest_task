import {Response, Request} from 'express';
import {prisma} from "../lib/prisma";
import {TaskSchema} from "../Schema/schema";

export default  async function updateTaskByIdController(req:Request,res:Response){

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

      const task = TaskSchema.safeParse(req.body);

      if (task.error){
          return res.status(400).json({
              message:" invalid format task",
              status: false
          })
      }

      const update_task  = await prisma.task.update({
          where:{
              id: id
          },
          data: {
              title: task.data?.title,
              descripcion: task.data?.descripcion,
          }
      })

        if (!update_task){
            return res.status(400).json({
                message: 'error in update task',
                status: false
            })
        }

        res.status(200).json({
            status: true,
            data: update_task
        })


    }catch (error){
        if (error instanceof Error){
            console.log(error.message);
            res.status(500).json({
                message:"Something went wrong",
                status: false
            });
        }
    }
}