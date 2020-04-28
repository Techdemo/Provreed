const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
    title: 'Home pagina'
  })
})

Router.post('/add', (req, res) => {

  console.log("submitted")
  return;
})

module.exports = Router;