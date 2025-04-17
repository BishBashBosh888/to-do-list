const userModel = require('../models/userModel');

exports.getAllUsers = async (req,res)=>{
    try{
        const users = await userModel.getAll();
        res.status(200).json(users);
    }catch (error){
        console.error('Error getting users:', error);
        res.status(500).json({error: 'Server error'});
    }
};

exports.getUserById = async (req,res) =>{
    try{
        const user = await userModel.getById(req.params.id);
        if(!user){
            return res.status(404).json({error:'User not found'});
        }
        res.status(200).json(user);
    }catch (error){
        console.error('Error getting user:', error);
        res.status(500).json({error:'Server error'});
    }
};

exports.createUser = async(req,res) =>{
    try{
        const newUser = await userModel.create(req.body);
        res.status(201).json(newUser);
    }catch(error){
        console.error('Error creating user:', error);
        res.status(500).json({error:'Server error'});
    }
};

exports.updateUser = async(req,res)=>{
    try{
        const updated = await userModel.update(req.params.id, req.body);
        if(!updated){
            return res.status(404).json({error:'User not found'});
        }
        res.status(200).json(updated);
    }catch(error){
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Server error'});
    }
};

exports.deleteUser = async(req,res)=>{
    try{
        const deleted = await userModel.delete(req.params.id);
        if(!deleted){
            return res.status(404).json({error: 'User not found'});
        }
        res.status(204).send();
    }catch(error){
        console.error('Error deleting user:', error);
        res.status(500).json({error: 'Server error'});
    }
};