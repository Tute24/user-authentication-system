const express = require ('express')
const registerRouter = require('../routes/registerRouter.cjs')
const loginRouter = require("../routes/loginRouter.cjs")
const dashRouter = require("../routes/dashRouter.cjs")
const updateRouter = require('../routes/updateRouter.cjs')
const deleteRouter = require('../routes/deleteRouter.cjs')
const logoutRouter = require('../routes/logoutRouter.cjs')
const adminRouter = require('../routes/adminRouter.cjs')
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
const { verify } = require('jsonwebtoken')
require('dotenv').config()

mongoose.connect('mongodb://localhost:27017/authdb',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

app.use(cors())
app.use(express.json())

app.use(loginRouter)
app.use(registerRouter)
app.use(dashRouter)
app.use(updateRouter)
app.use(deleteRouter)
app.use(logoutRouter)
app.use(adminRouter)


app.listen(3000, ()=>{
    console.log('Server initialized.')
})