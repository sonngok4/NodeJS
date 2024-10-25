import express from "express";
import rootRouter from "./routes/root.mjs";
import userRouter from "./routes/user.mjs";
import { connectDB } from "./config/connectDB.mjs";
connectDB();
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use("/", rootRouter);
app.use("/users", userRouter);

app.listen(port, () => {
  console.log("Server stated!!!");
});
