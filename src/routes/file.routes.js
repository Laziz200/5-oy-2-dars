import { Router } from "express";
import fileController from "../controllers/file.controller.js";
import { userValidator } from "../middlewares/userValidate.js";
import { fileValidator } from "../middlewares/fileValidate.js";

export const fileRouter = Router();
fileRouter.post("/upload",userValidator,fileValidator,fileController.FILE_UPLOAD)