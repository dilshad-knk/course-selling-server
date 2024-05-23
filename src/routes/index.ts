import  express, { Router }  from "express";
import { router as userRoutes} from "./user/userRoutes";



export const router: Router = express.Router();




router.use('/user',userRoutes)




