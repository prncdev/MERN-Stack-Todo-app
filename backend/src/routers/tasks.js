const { Router } = require('express');
const { getTasks, createTask, updateTask, removeTask } = require('../controller');

const routes = Router();

routes.route('/').get(getTasks).post(createTask);
routes.route('/:id').put(updateTask).delete(removeTask);

module.exports = routes;