const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User.model')

//Get all user to admin accounts.
router.get('/api/user',secureRoute("admin"), async function (req, res) {
    const users = await User.find({})
    if(users.length < 1){
        res.status(404).json({msg: "Users not found."})
    } else {
        res.json(users)
    }
})

//Add a new user, open to all visitors.
router.post('/api/user', async function (req, res) {
    let cryptPassword
    if(!req.body.password || req.body.password.length < 5){
        return res.status(400).send({msg: "Password is to short, 6 or longer"})
    } else {
        cryptPassword = await bcrypt.hash(req.body.password, 10)
    }

    let user = new User({username: req.body.username, password: cryptPassword, admin: false})
    // console.log(user)
    try {
        user.save(function (err, user) {
            if(err){//db error, duplicate name or bad password.
                res.status(400).send(
                {msg: err.message})
            }
            res.status(201).json(user)//201 OK created and send back new user.
        })
    } catch (error) { //Other errors.
        console.log(error)
        res.status(400).send({msg: "Error creating a new user"})
    }
})

//Admin can update a user.
router.put('/api/user',secureRoute("admin"), function (req, res) {
    res.json({msg:"from PUT /api/user"})
    //TODO admin updates users.
})

//Admin can delete a user.
router.delete('/api/user',secureRoute("admin"), async function (req, res) {
    if(req.body.username){
        const user = await User.findOneAndDelete({username: req.body.username})
        if(user){
            res.json(user)
        } else {
            res.status(404).json({msg: "User not found."})
        }

    } else {
        res.status(400).json({msg: "Username required to delete a user."})
    }
})

//Check if user has correct access privileges like 'admin' or 'user'.
function secureRoute(role){
    return function(req, res, next) {
        if(req.session.role !== role){
            res.status(401).json({msg: "Access denied. Please login with the correct access privileges"})
            return
        }
        console.log(" Correct user role , access granted.")
        next()
    }
}

module.exports = router