
const express = require('express')
const usersRouter = express.Router()
const db = require('./db-config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (req,res)=> {
 const token = req.headers.authorization 
  if(token){
        const users = await db('users')
        res.status(200).json({users})
  } else {
      res.status(401).json({message: 'you must be logged in!'})
  }
})

usersRouter.post('/register',(req,res)=> {
    const hash = bcrypt.hashSync(req.body.password,12)
    req.body.password = hash
    db('users').insert(req.body)
        .then(user => {
            if(user){
                const token = generateToken(user)
                res.status(201).json({message: `user created, welcome ${req.body.username}!`,token})
            } else {
                res.status(404).json({message:'user not created'})
            }
        })
})



usersRouter.post('/login',(req,res)=> {
    db('users').where({username: req.body.username})
        .then(user => {
            if(user && bcrypt.compare(req.body.password,user.password)){
                const token = generateToken(user)
                res.status(200).json({message:`welcome back ${req.body.username}!`,token})
            } else {
                res.status(404).json({message:'you shall not pass'})
            }
        })
})



const generateToken = (user) => {
  const payload = {
      subject: user.id,
      username: user.username
    }

  const secret = 'ssrtdtetwafsgsgsrg'
  const options = {
      expiresIn: '8h'
  }
  return jwt.sign(payload,secret,options)
}

module.exports = usersRouter





