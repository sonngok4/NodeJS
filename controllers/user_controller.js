const User = require("../models/user");

class UserController {
    static async index(req, res) {
        let q = req.query.q;
        const re = new RegExp(q, 'i'); // /dfdf/
        let users;
        if (q) {
            users = await User.find({ $or: [{ name: re }, { email: re }] });
        } else {
            users = await User.find({});
        }

        if (q == '') {
            users = await User.find({});
        }

        // console.log(users);
        res.render("users", { title: "User management", users, q });
    }
}

module.exports = UserController;