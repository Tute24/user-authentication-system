const express = require ('express')
const registerRouter = require('../routes/registerRouter.cjs')
const cors = require ('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use(registerRouter)

app.listen(3000, ()=>{
    console.log('Server initialized.')
})