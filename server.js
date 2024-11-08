const express = require('express')
const mongoose = require('mongoose')
const app = express()
const WilderModel = require('./models/Wilder')

mongoose
  .connect('mongodb://localhost:27017/wildcode', {
    autoIndex: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB', err)
  })

app.get('/', (req, res) => {
  console.log('Create a new wilder')
  WilderModel.init().then(() => {
    const wilder = new WilderModel({
      name: 'Pierre',
      city: 'Paris',
      skills: [
        { title: 'HTML', votes: 10 },
        { title: 'CSS', votes: 10 },
        { title: 'JS', votes: 10 },
      ],
    })
    wilder
      .save()
      .then((result) => {
        console.log('Wilder created', result)
      })
      .catch((error) => {
        console.error('Failed to create wilder', error)
      })
  })
})

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})
