import express from "express";
import UserController from "../controllers/user_controller.mjs";
const userRouter = express.Router();
userRouter.get("/", UserController.index);
export default userRouter;
