const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProposalSchema = new Schema({
  prospectName: {
    type: String,
    required: true,
    select: true,
  },
  prospectChallenge: {
    type: String,
    required: true,
    select: true,
  },
  prospectServices: {
    type: String,
    required: true,
    select: true,
  },
  proposalCreated: {
    type: String,
    required: true,
    select: true,
  },
  proposalOpened: {
    type: String,
    required: false
  },
  proposalStatus: {
    type: String,
    required: false
  }
});


module.exports = mongoose.model('Proposal', ProposalSchema);

