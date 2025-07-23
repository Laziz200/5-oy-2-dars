import { Router } from "express";
import { fileRouter } from "./file.routes.js";

export const mainRouter = Router();

mainRouter.use("/file", fileRouter);