const express = require('express')
const mongoose = require('mongoose')
const wilderRouter = require('./routes/wilder')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 5000

mongoose
  .connect(`${process.env.MONGO_URI}`, {
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

app.use('/api/wilder', wilderRouter)

app.use((req, res) => {
  res.status(404).send('Sorry can\'t find that!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
