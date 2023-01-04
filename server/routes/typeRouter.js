import { Router } from "express";

const typeRouter = new Router();

import typeControler from "../controller/typeControler.js";

typeRouter.post("/", typeControler.create);
typeRouter.get("/", typeControler.getAll);
typeRouter.get("/:id", typeControler.getOne);

export default typeRouter;
