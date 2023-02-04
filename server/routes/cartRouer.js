import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import cartController from "../controller/cartController.js";

const cartRouter = Router();

/* 
    GET /api/cart

    Fetches all devices of user
*/
cartRouter.get("/:userId", authMiddleware, cartController.getAll);

/*
    POST /api/cart/add

    Adds device to cart
*/
cartRouter.post("/add/:userId", authMiddleware, cartController.create);

/*
    DELETE /api/cart

    Deletes device from cart
*/
cartRouter.delete("/delete/:deviceId", authMiddleware, cartController.delete);

export default cartRouter;
