const express = require('express')
const User = require('../Schemas/schema.cjs')

const router = express.Router()

router.post('/login', async (req, res)=>{
    const {email, password} = req.body

    const checkAuthenticatedUser = await User.findOne({email,password})

    if(!checkAuthenticatedUser){
       return res.status(401).json({message:"Incorrect email/password! Try again."})
    }else{
        return res.status(201).json({message: "User successfully authenticated!"})
    }
})

module.exports = router