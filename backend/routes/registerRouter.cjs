const express = require('express')
const mongoose = require('mongoose')
const User = require('../Schemas/schema.cjs')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/register', async (req, res) =>{
   const {email, password} = req.body

   const checkExistentUser = await User.findOne({email})

   if(checkExistentUser){
    return res.status(400).json({message: "This email already belongs to an existing user!"})
   } else{

    const hashedPassword = await bcrypt.hash(password,10)
    try{
        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save()
        return res.status(201).json({message: "New user successfully registered!"})

    } catch(error){
        return res.status(500).json({message: 'Server error'})
    }
}})

module.exports = router