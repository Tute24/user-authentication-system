const express = require ('express')
const registerRouter = require('./routes/registerRouter.cjs')
const loginRouter = require("./routes/loginRouter.cjs")
const dashRouter = require("./routes/dashRouter.cjs")
const updateRouter = require('./routes/updateRouter.cjs')
const deleteRouter = require('./routes/deleteRouter.cjs')
const logoutRouter = require('./routes/logoutRouter.cjs')
const adminRouter = require('./routes/adminRouter.cjs')
const adminLogoutRouter = require('./routes/adminLogoutRouter.cjs')
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
const { verify } = require('jsonwebtoken')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

app.use(cors({
    origin:["https://userauth-frontend.vercel.app/"],
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))
app.use(express.json())

app.use(loginRouter)
app.use(registerRouter)
app.use(dashRouter)
app.use(updateRouter)
app.use(deleteRouter)
app.use(logoutRouter)
app.use(adminRouter)
app.use(adminLogoutRouter)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server initialized on port ${port}`);
});