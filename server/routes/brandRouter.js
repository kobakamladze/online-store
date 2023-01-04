import { Router } from "express";

const brandRouter = new Router();

import brandController from "../controller/brandController.js";

brandRouter.post("/", brandController.create);
brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.getOne);

export default brandRouter;
