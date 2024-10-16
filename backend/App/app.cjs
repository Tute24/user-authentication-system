const express = require ('express')
const registerRouter = require('../routes/registerRouter.cjs')
const loginRouter = require("../routes/loginRouter.cjs")
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authdb',{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

app.use(cors())
app.use(express.json())

app.use(registerRouter)
app.use(loginRouter)

app.listen(3000, ()=>{
    console.log('Server initialized.')
})