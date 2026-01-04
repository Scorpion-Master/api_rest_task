import {Router} from "express";
import loginUserController from "../controllers/auth/login.User.controller";
import registerUserController from "../controllers/auth/register.user.controller";
import createTaskController from "../controllers/create.task.Controller";
import getAllTaskController from "../controllers/get.all.task.Controller";
import getTaskByIdController from "../controllers/get.Task.By.Id.Controller";

const router = Router();


router.post('/auth/login',loginUserController);

router.post('/auth/register',registerUserController);








export default router;