const express = require('express')
const User = require('../Schemas/schema.cjs')
const bcrypt = require('bcrypt')

const router = express.Router()

router.post('/login', async (req, res)=>{
    const {email, password} = req.body

    const checkAuthenticatedUser = await User.findOne({email})

    if(!checkAuthenticatedUser || !(await bcrypt.compare(password,checkAuthenticatedUser.hashedPassword))){
       return res.status(401).json({message:"Incorrect email/password! Try again."})
    }else{
        return res.status(201).json({message: "User successfully authenticated!"})
    }
})

module.exports = router