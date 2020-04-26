const express = require('express')
const Router = express.Router()

Router.get('/login', (req, res) => {
  res.render('home', {
    layout: 'default',
    title: 'Login pagina'
  })
})

module.exports = Router;