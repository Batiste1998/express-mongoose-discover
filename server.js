const express = require('express')
const mongoose = require('mongoose')
const wilderController = require('./controllers/wilder')
const { wilderValidation } = require('./validation')
require('dotenv').config()
const app = express()

mongoose
  .connect(process.env.MONGO_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/api/wilder/create', wilderValidation.create, wilderController.create)

app.use((req, res) => {
  res.status(404).send('Sorry can\'t find that!')
})

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:5000')
})
