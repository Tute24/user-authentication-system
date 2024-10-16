const express = require('express')
const mongoose = require('mongoose')




const router = express.Router()

router.post('/register', (req, res) =>{
   const {email, password} = req.body


})

module.exports = router