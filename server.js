const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const morgan = require('morgan')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  // connection: {
  //   connectionString: process.env.DATABASE_URL,
  //   ssl: true
  // }
  connection: process.env.POSTGRES_URI
})

const app = express()

app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())
// Root
app.get('/', (req, res, next) => {
  res.send("It's working")
})

// Sign In
app.post('/signin', (req, res, next) => {
  signin.handleSignin(req, res, db, bcrypt)
})

// Register
app.post('/register', (req, res, next) => {
  register.handleRegister(req, res, db, bcrypt)
})

// Profile ID
app.get('/profile/:id', (req, res, next) => {
  profile.handleProfileGet(req, res, db)
})

// Image
app.put('/image', (req, res, next) => {
  image.handleImage(req, res, db)
})

// Image URL API
app.post('/imageurl', (req, res, next) => {
  image.handleApiCall(req, res)
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
