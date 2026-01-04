import  express from 'express'
import  morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import ApiRouts from "./routes/auth.routes"
import TaskRoutes from './routes/task.routes'
import cookieParser  from "cookie-parser";

dotenv.config()

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('dev'));
server.use(cors());
server.use(cookieParser());

// routes
server.use('/api/v1/',ApiRouts);
server.use('/api/v1/',TaskRoutes);

const port = process.env.PORT || 4000;

server.listen(port, ()=>{console.log(`Server started on port ${port}`)});