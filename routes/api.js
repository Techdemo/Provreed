const moment = require('moment')
let Proposal = require('../models/models')

module.exports = function (app, io) {
  // Find All Endpoint.
  app.get('/api/v1/proposals', (req, res) => {
    Proposal.find()
      .then((proposals) => {
        io.sockets.emit('update'); // how?
        res.status(200).json({
          resolved: "success",
          data: {
            proposals: proposals,
          },
        });
      })
      .catch((err) => {
        res.stats(500).json({
          resolved: "failure",
          message: "Some error occurred while retrieving Proposals.",
          error: err,
        });
      });
  });


  // Create Endpoint
app.post('/api/v1/proposal/new', (req, res) => {

  if (!req.body.proposal) {
    res.status(400).json({
      resolved: "failure",
      message: 'req.body.proposal can not be empty',
    });
    return;
  }

  const proposal = new Proposal({
    prospectName: req.body.proposal.prospectName, //String.  Required.. Selected.
    prospectChallenge: req.body.proposal.prospectChallenge, //String.  Required.. Selected.
    prospectServices: req.body.proposal.prospectServices, //String.  Required.. Selected.
    proposalCreated: moment().format('DD/MM/YYYY'),
    proposalOpened: 'Not yet opened',
    proposalStatus: 'Open'
  });

  proposal.save()
    .then((proposal) => {
      res.status(201).json({
        resolved: "success",
        data: {
          proposal: proposal,
        }
      });
    })
    .catch((err) => {
      res.status(409).json({
        resolved: "failure",
        message: "Maybe because data already exists.",
        error: err
      });
    });
  });
}