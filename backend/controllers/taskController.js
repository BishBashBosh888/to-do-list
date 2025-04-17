const taskModel = require('../models/taskModel');

exports.createTask = async(req,res)=>{
    const {title, description, due_date} = req.body;
    const userId = req.user.id;
    try{
        const task = await taskModel.create({title, description, due_date, user_id: userId});
        res.status(201).json(task);
    }catch(error){
        console.error("error creating task", error);
        res.status(500).json({error: 'Server error'});
    }
}

exports.getTasks = async (req,res) =>{
    const userId = req.user.id;
    try{
        const tasks = await taskModel.getByUserId(userId);
        res.status(200).json(tasks); 
    }catch(error){
        console.error("error getting user's tasks", error);
        res.status(500).json({error:'Server error'});
    }
}

exports.getTaskById = async(req,res) =>{
    const taskId = req.params.id
    try{
        const task = await taskModel.getByid(taskId);
        if(!task){
            return res.status(404).json("Task not found");
        }
        res.status(200).json(task);
    }catch(error){
        console.error('Error getting task',error);
        res.status(505).json({error:'Server error'});
    }
}

exports.updateTask = async(req,res) =>{
    const {id} = req.params;
    const {title, description, due, is_completed} = req.body;
    try{
        const updated = await taskModel.update(id, {title,description,due,is_completed});
        if(!updated){
            return res.status(404).json('Error updating task');
        }
        res.status(200).json(updated)
    }catch(error){
        console.error('Error updating task', error);
        res.status(500).json({error:'Server error'});
    }
}

exports.deleteTask = async(req,res) =>{
    const {id} = req.params;
    try{
        const deleted = await taskModel.delete(id);
        if(!deleted){
            return res.status(404).json(`Error deleting task`);
        }
        res.status(204).send();
    }catch(error){
        console.error('Error deleting task',error);
        res.status(500).json({error:'Server error'});
    }
}