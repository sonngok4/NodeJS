import User from "../models/user.mjs";
class UserController {
  static async index(req, res) {
    let q = req.query.q;
    const re = new RegExp(q); // /dfdf/
    let users;
    if (q) {
      users = await User.find({ $or: [{ name: re }, { email: re }] });
    } else {
      users = await User.find({});
    }

    // console.log(users);
    res.render("user", { title: "User management", users, q });
  }
}

export default UserController;
