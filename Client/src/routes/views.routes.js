import { Router } from "express";
import viewsController from "../controllers/views.controller.js";

export const viewRouter= Router();
viewRouter.get("/",viewsController.INDEX);
viewRouter.get("/login",viewsController.LOGIN);