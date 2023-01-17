import { Router } from "express";

const typeRouter = new Router();

import typeControler from "../controller/typeControler.js";
import authRoleMiddleware from "../middleware/checkRoleMiddleware.js";

/* 
    POST /api/type

    Adds new brand to DB
*/
typeRouter.post("/", authRoleMiddleware("ADMIN"), typeControler.create);

/* 
    GET /api/type

    Fetches all types DB
*/
typeRouter.get("/", typeControler.getAll);

/* 
    GET /api/type

    Fetches one type found by id DB
*/
typeRouter.get("/:id", typeControler.getOne);

export default typeRouter;
