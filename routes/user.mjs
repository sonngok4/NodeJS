import express from "express";
import UserController from "../controllers/user_controller.mjs";
const userRouter = express.Router();
userRouter.get("/", UserController.index);
userRouter.get("/newuser", UserController.createUser);
userRouter.post("/newuser", UserController.createUser);
export default userRouter;
