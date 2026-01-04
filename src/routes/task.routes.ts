import  {Router} from "express";
import createTaskController from "../controllers/create.task.Controller";
import getAllTaskController from "../controllers/get.all.task.Controller";
import getTaskByIdController from "../controllers/get.Task.By.Id.Controller";
import {authMiddleware} from "../middleware/authMiddleware";
import updateTaskByIdController from "../controllers/update.task.controller";
import deleteTaskByIdController from "../controllers/delete.task.by.Id.Controller";

const router = Router();


router.post('/task', authMiddleware,createTaskController);
router.get('/task',authMiddleware,getAllTaskController);
router.get('/task/:id',authMiddleware,getTaskByIdController);
router.put('/task/:id',authMiddleware,updateTaskByIdController);
router.delete('/task/:id',authMiddleware,deleteTaskByIdController);


export default router;