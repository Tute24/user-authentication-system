const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Schemas/schema.cjs')
const router = express.Router()

async function isAuthenticated(req,res, next){
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    jwt.verify(token,process.env.SECRET_KEY,function(err,body){
        if(err){
            return res.status(403).json({message:"Forbidden"})
        }
            
            req.payLoad = body
            next()
    })
}

router.get('/logout', isAuthenticated, async(req,res)=>{
    const {email} = req.payLoad

    const userCheck = await User.findOne({email})

    if(!userCheck){
        res.status(404).json({message:"User not found."})
    }else{
        res.status(200).json({message:"User sucessfully logged out."})
    }
})

module.exports = router