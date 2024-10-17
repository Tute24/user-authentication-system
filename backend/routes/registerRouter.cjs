const express = require('express')
const mongoose = require('mongoose')
const User = require('../Schemas/schema.cjs')

const router = express.Router()

router.post('/register', async (req, res) =>{
   const {email, password} = req.body

   const checkExistentUser = await User.findOne({email})

   if(checkExistentUser){
    return res.status(400).json({message: "This email already belongs to an existing user!"})
   } else{

    // Hash the password and put it in a const (bcrypt.hash(password,10))
    try{
        const newUser = new User({
            email,
            password
            // Put the hashed password here after changing the schema for User structure. Only the hashed password is needed in the schema
        })

        await newUser.save()
        return res.status(201).json({message: "New user successfully registered!"})

    } catch(error){
        return res.status(500).json({message: 'Server error'})
    }
}})

module.exports = router