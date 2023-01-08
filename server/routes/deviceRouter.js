import { Router } from "express";

const deviceRouter = new Router();

import deviceController from "../controller/deviceController.js";
import authRoleMiddleware from "../middleware/checkRoleMiddleware.js";

/*
    POST /api/device
*/
deviceRouter.post("/", authRoleMiddleware("ADMIN"), deviceController.create);

/*
    GET /api/device
*/
deviceRouter.get("/", deviceController.getAll);

/*
    GET /api/device/:deviceId
*/
deviceRouter.get("/:id", deviceController.getOne);

export default deviceRouter;
