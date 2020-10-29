const express = require('express');

module.exports = function(app) {
  app.get('/admin', (req, res, next) => {

    const isSigned = () => { return false }

    res.render('home', {
      layout: 'default', 
      session: isSigned
    })
  })
}