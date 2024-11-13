const User = require("../models/user");

class CvController {
    static async detail(req, res) {
        let data = await User.find({ age: { $in: [20, 30] } });
        let user = data[0];
        console.log(data);
        res.render("cv", { title: "Home Page", user });
    }
}

module.exports = CvController;