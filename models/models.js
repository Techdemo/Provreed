let mongoose = require('mongoose')

// proposal schema
let proposalSchema = mongoose.Schema({
  prospectName:{
    type: String,
    required: true,
  },
  prospectChallenge: {
    type: String,
    required: true,
  },
  prospectServices: {
    type: String,
    required: true
  }
})

let Proposal = module.exports = mongoose.model('Proposal', proposalSchema)