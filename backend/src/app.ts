import cookieParser from "cookie-parser";
import express, { type Application, type Response } from "express";
import morgan from "morgan";
import { corsMiddleware } from "./middleware/cors.ts";
import { RouterAuth } from "./routes/user.route.ts";

export const app: Application = express();

app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware());

app.use("/auth", RouterAuth);

app.get("/", (res: Response) => {
  res.send("Servidor de tareas corriendo");
});
