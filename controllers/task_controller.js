const Task = require('../models/Task.js');
class TaskController {
    static async getTasks(req, res) {
        try {
            const { search, status, startDate, endDate } = req.query;
            let query = {};

            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }

            if (status) {
                query.status = status;
            }

            if (startDate && endDate) {
                query.dueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
            } else if (startDate) {
                query.dueDate = { $gte: new Date(startDate) };
            } else if (endDate) {
                query.dueDate = { $lte: new Date(endDate) };
            }

            const tasks = await Task.find(query);
            res.render('index', { tasks, title: 'Quản lý công việc', search, status, startDate, endDate });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    static async getTaskDetail(req, res) {
        try {
            const task = await Task.findById(req.params.id);
            res.render('detail', { task, title: `Chi tiết công việc #${task._id}` });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

module.exports = TaskController;