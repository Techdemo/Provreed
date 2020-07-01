const moment = require('moment')
let Proposal = require('../models/Proposal')
const auth = require('../middleware/auth')

module.exports = function (app, io) {
// @route GET api/proposals
// @desc show all proposals
// @acces restricted
  app.get('/api/v1/proposals', auth, (req, res) => {
    Proposal.find()
      .then((proposals) => {
        res.status(200).json({
          resolved: "success",
          data: {
            proposals: proposals,
          },
        });
        // io.sockets.emit('update-proposals'); // how?
      })
      .catch((err) => {
        res.stats(500).json({
          resolved: "failure",
          message: "Some error occurred while retrieving Proposals.",
          error: err,
        });
      });
  });


// @route POST api/proposal/new
// @desc post a new proposal
// @acces restricted
app.post('/api/v1/proposal/new', auth, (req, res) => {
  if (!req.body.prospectName) {
    res.status(400).json({
      resolved: "failure",
      message: 'req.body.proposal can not be empty',
    });
    return;
  }

  const proposal = new Proposal({
    prospectName: req.body.prospectName, //String.  Required.. Selected.
    prospectChallenge: req.body.prospectChallenge, //String.  Required.. Selected.
    prospectServices: req.body.prospectServices, //String.  Required.. Selected.
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