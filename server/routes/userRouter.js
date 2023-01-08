import { Router } from "express";
import { body } from "express-validator";

const userRouter = new Router();

import userController from "../controller/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

/* 
    POST /api/users/registration
*/
userRouter.post(
  "/registration",
  // Validation for Email
  body("email").notEmpty().isEmail(),
  // Validation for password
  body("password").notEmpty(),
  // Validation for role
  body("role").notEmpty(),
  userController.registration
);

/* 
    POST /api/users/login
*/
userRouter.post(
  "/login",
  // Validation of Email
  body("email").notEmpty().isEmail(),
  // Validation of password
  body("password").notEmpty(),
  userController.login
);

/* 
    GET /api/users/auth
*/
userRouter.get("/auth", authMiddleware, userController.check);

export default userRouter;
