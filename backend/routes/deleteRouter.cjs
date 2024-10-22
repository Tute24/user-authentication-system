const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
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

router.post('/delete',isAuthenticated, async (req,res)=>{
    const {email} = req.payLoad
    const {deletedEmail, deletedPassword} = req.body

    try{
        if(email !== deletedEmail ){
           return res.sendStatus(404)
        } 
            const tbdeletedUser = await User.findOne({email})
            if(!tbdeletedUser){
              return  res.sendStatus(404)
            }
            
            const passwordMatch = (await bcrypt.compare(deletedPassword,tbdeletedUser.password))

            if(!passwordMatch){
              return  res.sendStatus(401)
            }

                await User.deleteOne({email}) 
               return res.sendStatus(200)
                 
        }
    
    catch(error){
            return res.status(500)
    }

     
})

module.exports = router