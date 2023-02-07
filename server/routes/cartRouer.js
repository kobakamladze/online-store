import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import cartController from "../controller/cartController.js";

const cartRouter = Router();

/* 
    GET /api/cart/:userid

    Fetches all devices of user
*/
cartRouter.get("/:userId", authMiddleware, cartController.getAll);

/*
    POST /api/cart/add/:userId

    Adds device to cart
*/
cartRouter.post("/add/:deviceId", authMiddleware, cartController.add);

/*
    DELETE /api/cart/delete/:deviceId

    Deletes device from cart
*/
cartRouter.delete("/delete/:deviceId", authMiddleware, cartController.delete);

export default cartRouter;
