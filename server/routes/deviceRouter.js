import { Router } from "express";

const deviceRouter = new Router();

import deviceController from "../controller/deviceController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import authRoleMiddleware from "../middleware/checkRoleMiddleware.js";

/*
    POST /api/device

    Adds device to DB
*/
deviceRouter.post("/", authRoleMiddleware("ADMIN"), deviceController.create);

/*
    GET /api/device

    fetches all devices
*/
deviceRouter.get("/", deviceController.getAll);

/*
    GET /api/device/:deviceId

    Fetches one device found by deviceId
*/
deviceRouter.get("/:id", deviceController.getOne);

export default deviceRouter;
