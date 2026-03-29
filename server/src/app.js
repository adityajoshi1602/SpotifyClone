const express= require('express')
const cookieparser = require('cookie-parser')
const authroutes = require('../routes/auth.routes')
const app =express()


app.use(express.json())
app.use(cookieparser())

app.use('/api/auth',authroutes)

module.exports =app