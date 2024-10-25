import User from "../models/user.mjs";
class CvController {
  static async detail(req, res) {
    let data = await User.find({ age: { $in: [20, 30] } });
    let user = data[0];
    console.log(data);
    res.send(data);
    // let workExperience = user.workExperience;
    // res.render("cv", { title: "Home Page", workExperience });
  }
}

export default CvController;
