import { Router } from "express";
import { body } from "express-validator";

import userController from "../controller/userController.js";

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
  // userController action
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
  // userController action
  userController.logIn
);

/* 
    POST /api/user/logout

    Logging in with email and password
*/
userRouter.get("/logout", userController.logOut);

/* 
    GET /api/user/auth

    Authorization endpoint
*/
userRouter.get("/auth", userController.check);

/* 
    GET /api/user/refresh

    Authorization endpoint
*/
userRouter.get("/refresh", userController.refresh);

export default userRouter;
