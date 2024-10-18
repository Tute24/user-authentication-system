const express = require ('express')
const jwt = require('jsonwebtoken')

async function isAuthenticated(req,res, next){
    const token = req.headers["Authorization"].split("")[1]

    if (!token){
        return res.sendStatus(401).json({message:"Unauthorized"})
    }

    jwt.verify(token,process.env.SECRET_KEY,function(err,body){
        if(err){
            return res.sendStatus(403).json({message:"Forbidden"})
        }
            req.payLoad = body
            next()
    })
}

const router = express.Router()

router.get('/dashboard',isAuthenticated, async (req,res)=>{
    // Essa rota vai devolver se o token tá valido ou não, e se tiver, vou renderizar o dashboard no FE
})