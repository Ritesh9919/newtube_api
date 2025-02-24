import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middleware/errorHandler.middleware.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use(errorHandlerMiddleware);

export { app };
