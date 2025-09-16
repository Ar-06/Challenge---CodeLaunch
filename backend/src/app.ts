import cookieParser from "cookie-parser";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import morgan from "morgan";
import { corsMiddleware } from "./middleware/cors.js";
import { RouterAuth } from "./routes/user.route.js";
import { RouterTask } from "./routes/task.route.js";

export const app: Application = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware());

app.use("/auth", RouterAuth);
app.use("/tasks", RouterTask);

app.get("/", (_req: Request, res: Response) => {
  res.send("Servidor de tareas corriendo");
});
