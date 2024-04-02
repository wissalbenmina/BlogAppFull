const User = require('../models/User');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

// get all users
async function getAllUsers(req, res){
    try { 
        const users = await User.find()

        if(!users || users.length === 0){
            return res.status(404).send({message: 'There are no Users'})
        }

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

// get user by id
async function getUserById(req, res){
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).send({message: 'User not found'})
        }

        return res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}

// create user
async function createUser(req, res){
    const {username, email, password, role} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username, 
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        res.status(200).send(savedUser)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// update user
async function updateUser(req, res){
    const id = req.params;
    const {username, email, password} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {username, email, password}, { new: true })

        if(!updatedUser){
            res.status(404).send('User not found') 
        }

        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

// delete user
async function deleteUser(req, res){
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            res.status(404).send('User not found') 
        }

        res.send('User deleted successfully')
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}