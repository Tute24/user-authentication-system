const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Schemas/schema.cjs')
const router = express.Router()

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

router.get('/admin', isAdmin, async (req,res)=>{
    
    try{
        const database = await User.find({}, "username email")
        return res.json({user: database})
    }
    catch(error){
        return res.status(500)
    }
})

router.post('/giveAdmin',isAdmin,async(req,res)=>{
    const {fetchedEmail} = req.body
    
    try{
     const fetchedUser = await User.findOne({email: fetchedEmail})
     fetchedUser.role = 'admin'
    await fetchedUser.save()
     res.json({message: "All good."})
    }catch(error){
     res.json({message:"Error good"})
    }
 })

 router.post('/deletedUser', isAdmin,async(req,res) => {
    const {deletedEmail} = req.body

    if (deletedEmail){
        try{
             await User.deleteOne({email: deletedEmail})
            
        }catch(error){
            res.json({message: error})
        }
    }
 })

module.exports = router