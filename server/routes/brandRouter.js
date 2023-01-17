import { Router } from "express";

const brandRouter = new Router();

import brandController from "../controller/brandController.js";
import authRoleMiddleware from "../middleware/checkRoleMiddleware.js";

/* 
    POST /api/brand

    Adds new type to DB
*/
brandRouter.post("/", authRoleMiddleware("ADMIN"), brandController.create);

/* 
    GET /api/brand

    Fetches all brands from DB
*/
brandRouter.get("/", brandController.getAll);

/* 
    GET /api/brand/:id

    Finds one brand by ID an returns it from DB
*/
brandRouter.get("/:id", brandController.getOne);

export default brandRouter;
