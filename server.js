const express = require('express')
const server = express()
const session = require('express-session')
const usersRouter = require('./usersRouter')


const sessionConfig = {
  name: 'sessionconfig',
  secret:'super secret',
  cookie: {
    maxAge: 1000 * 30,
    secure: false,
    httpOnly: true,
   },
  resave:false,
  saveUninitialized: false
}

server.use(express.json())
server.use(session(sessionConfig))
server.use('/users',usersRouter)
 

module.exports = server
