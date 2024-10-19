const express = require('express')
const jwt = require('jsonwebtoken')
const User = require("../Schemas/schema.cjs")
const bcrypt = require('bcrypt')

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

router.post('/update',isAuthenticated,async (req,res)=>{
    const {email} = req.payLoad
    const {submittedEmail, submittedPassword} = req.body

    try{
        const authUser = await User.findOne({email})

        if(!authUser){
            return res.status(404).json({message: "User not found"})
        } else if((authUser.email !== submittedEmail) && !(await bcrypt.compare(submittedPassword,authUser.password))){
            authUser.email = submittedEmail
            authUser.password = await bcrypt.hash(submittedPassword,10)
            await authUser.save()
        } else if(!(await bcrypt.compare(submittedPassword,authUser.password))){
            
            authUser.password = await bcrypt.hash(submittedPassword,10)
            await authUser.save()
        } else if((authUser.email !== submittedEmail)){
            authUser.email = submittedEmail
            await authUser.save()
        } 
        const newToken = jwt.sign({email: authUser.email},process.env.SECRET_KEY)
            return res.json({message: "User Updated Successfully",token: newToken})
    } 
    catch(error){
        res.status(500).json({message:"Server Error"})
    }
})

module.exports = router