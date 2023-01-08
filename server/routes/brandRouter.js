import { Router } from "express";

const brandRouter = new Router();

import brandController from "../controller/brandController.js";
import authRoleMiddleware from "../middleware/checkRoleMiddleware.js";

brandRouter.post("/", authRoleMiddleware("ADMIN"), brandController.create);
brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.getOne);

export default brandRouter;
