
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db";
import {router as routes} from "./routes/index";


const app: Express = express();
const port = process.env.PORT || 3000;


dotenv.config();
connectDb()


app.use(express.json())
app.use(cookieParser())


app.use('/api/v1',routes)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



