const express = require('express')
const Router = express.Router()

// import model
let Proposal = require('../models/models')

Router.get('/', (req, res) => {
  res.render('home', {
    layout: 'default',
    title: 'Home pagina'
  })
})

Router.post('/add', (req, res) => {

  console.log(req.body.name_prospect)
  let proposal = new Proposal()

  proposal.prospectName = req.body.name_prospect
  proposal.prospectChallenge = req.body.challenge_prospect
  proposal.prospectServices = req.body.services_prospect

  proposal.save((err) => {
    if(err){
      console.log(err)
      return;
    } else {
      res.redirect('/')
    }
  })
})

module.exports = Router;