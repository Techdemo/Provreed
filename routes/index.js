const express = require('express')
const Router = express.Router()

Router.get('/', (req, res) => {
  res.send('joejoe de server werkt')
})

module.exports = Router;