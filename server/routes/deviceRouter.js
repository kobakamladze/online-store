import { Router } from "express";

const deviceRouter = new Router();

import deviceController from "../controller/deviceController.js";

deviceRouter.post("/", deviceController.create);
deviceRouter.get("/", deviceController.getAll);
deviceRouter.get("/:id", deviceController.getOne);

export default deviceRouter;
