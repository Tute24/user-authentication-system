const express = require ('express')
const jwt = require('jsonwebtoken')
const User = require("../Schemas/schema.cjs")


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

const router = express.Router()

router.get('/dashboard',isAuthenticated, async (req,res)=>{
    const {email} = req.payLoad

    const loggedUser = await User.findOne({email})

    if(loggedUser){
        return res.json({user: loggedUser})    
    }else{
        return res.status(404).json({message: "There's no user with that email"})
    }
    
})

module.exports = router