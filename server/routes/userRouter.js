import { Router } from "express";
import { body } from "express-validator";

import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = new Router();

/* 
    POST /api/user/registration

    User registration with email and password
*/
userRouter.post(
  "/registration",
  // Validation for Email
  body("email").notEmpty().isEmail(),
  // Validation for password
  body("password").notEmpty(),
  userController.registration
);

/* 
    POST /api/user/login

    Logging in with email and password
*/
userRouter.post(
  "/login",
  // Validation of Email
  body("email").notEmpty().isEmail(),
  // Validation of password
  body("password").notEmpty(),
  // userController.login
  userController.login
);

/* 
    GET /api/user/auth

    Authorization endpoint
*/
userRouter.get("/auth", authMiddleware, userController.check);

export default userRouter;
