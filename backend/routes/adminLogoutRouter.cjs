const express = require ('express')
const jwt = require ('jsonwebtoken')
const router = express.Router()
const User = require('../Schemas/schema.cjs')


async function isAdmin(req,res, next){
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token){
        return res.status(401).json({message:"Unauthorized"})
    }



    jwt.verify(token,process.env.SECRET_KEY,async function(err,body){
        if(err){
            return res.status(403).json({message:"Forbidden"})
        }
        
        const user = await User.findOne({email: body.email})

        if(!user || user.role !== "admin"){
            return res.status(403).json({message: "Unauthorized."})
        }

            req.payLoad = body
            next()
    })
}

router.get('/adminlogout', isAdmin, async (req,res)=>{
    
    const {email}= req.payLoad

    try{
        await User.findOne({email})
        return res.sendStatus(200)
    }
    catch(error){
        return res.status(500)
    }
})

module.exports = router