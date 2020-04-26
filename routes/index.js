const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
    title: 'Home pagina'
  })
})

module.exports = Router;