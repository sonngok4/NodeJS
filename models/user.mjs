import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userScheme = new Schema({
  name: String,
  email: String,
  password: String,
  workExperience: Array(Object),
});

const User = mongoose.model("user", userScheme); //==> users

export default User;
