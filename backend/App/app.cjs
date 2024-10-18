const express = require ('express')
const registerRouter = require('../routes/registerRouter.cjs')
const loginRouter = require("../routes/loginRouter.cjs")
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/authdb',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

app.use(cors())
app.use(express.json())

app.use(registerRouter)
app.use(loginRouter)

async function isAuthenticated(req,res, next){
    const token = req.headers["Authorization"].split("")[1]

    if (!token){
        
    }
}

app.listen(3000, ()=>{
    console.log('Server initialized.')
})