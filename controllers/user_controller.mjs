import User from '../models/user.mjs';
class UserController {
	static async index(req, res) {
		let q = req.query.q;
		const re = new RegExp(q, 'i'); // /dfdf/
		let users;
		if (q) {
			users = await User.find({
				$or: [{ name: re }, { email: re }],
			});
		} else if (q == '') {
			users = await User.find({});
		}
		if (!users) {
			users = await User.find({});
		}

		// console.log(users);
		res.render('user', { title: 'User management', users, q });
	}

	static async createUser(req, res) {
		console.log(req.body);
		const { name, email, password } = req.body;

		const user = new User({ name, email, password });
		await user.save();

		res.redirect('/users');
		res.render('formuser', { title: 'User management' });
	}
}

export default UserController;
