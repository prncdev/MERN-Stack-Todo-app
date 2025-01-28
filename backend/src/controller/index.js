const Task = require('../model/task');


const getTasks = async function(req, res) {
  try {
    const tasks = await Task.find({});
    res.status(200).json({todos: tasks});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error});
  }
}


const createTask = async function(req, res) {
  try {
    const { title, description, status, date } = req.body;
    if(!title || !description || !date) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const parsedDate = new Date(date);
  
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const task = await Task.create({ title, description, status, date: parsedDate });
    res.status(201).json({todo: task});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error});
  }
}


const updateTask = async function(req, res) {
  try {
    const { id } = req.params;
    if(!(await Task.findById(id))) {
      return res.status(404).json({message: `No todo found with id: ${id}`});
    }

    const taskUpdate = await Task.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    res.status(200).json({message: `todo with ${id} has updated`});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error});
  }
}


const removeTask = async function(req, res) {
  try {
    const { id } = req.params;
    if(!(await Task.findById(id))) {
      return res.status(404).json({message: `No todo found with id: ${id}`});
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({message: `todo with ${id} has removed`});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error});
  }
}


module.exports = {
  getTasks,
  createTask,
  updateTask,
  removeTask
}