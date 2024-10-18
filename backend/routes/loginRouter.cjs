const express = require('express')
const User = require('../Schemas/schema.cjs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/login', async (req, res)=>{
    const {email, password} = req.body

    const checkAuthenticatedUser = await User.findOne({email})

    if(!checkAuthenticatedUser || !(await bcrypt.compare(password,checkAuthenticatedUser.password))){      
       return (
        res.json({message:"Incorrect email/password! Try again."})
    )
    }else{
        const token = jwt.sign({email: email},process.env.SECRET_KEY)
        return res.json({message: "User successfully authenticated!",token: token})
    }
})

module.exports = router