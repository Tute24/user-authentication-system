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
    try{
        const newUser = new User({
            email,
            password
        })

        await newUser.save()
        return res.status(201).json({message: "New user successfully registered!"})

    } catch(error){
        return res.status(500).json({message: 'Server error'})
    }
}})

module.exports = router