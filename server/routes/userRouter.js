import { Router } from "express";

const userRouter = new Router();

import userController from "../controller/userController.js";

userRouter.post("/registration", userController.registration);
userRouter.post("/login", userController.login);
userRouter.get("/auth", userController.check);

export default userRouter;
