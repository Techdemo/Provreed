let User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')

module.exports = function (app, io) {
// @route POST api/user
// @desc Register new user
// @acces restricted
  app.post('/api/v1/user/new', auth, (req, res) => {
    const { password, username } = req.body
    if (!password || !username) {
      res.status(400).json({
        resolved: "failure",
        message: 'req.body.user can not be empty',
      });
      return;
    }
    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) throw err;

        const user = new User({
          username,
          password: hash, //String.  Required.. Selected.
        });

        user.save()
          .then((user) => {
            let id = user.id
            const token = jwt.sign({ id }, "secret", {
              expiresIn: "24h"
            });

            res.status(201).json({
              resolved: "success",
              data: {
                token,
                user: {
                  id: user.id,
                  name: user.username
                }
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
      })
    })
  });


// @route DELETE api/user
// @desc Delete a single user
// @acces restricted
  app.delete('/api/v1/user/:userId', auth, (req, res) => {
    User.findByIdAndRemove(req.params.userId)  //Returns the updated document.
      .then((user) => {
        if (!user) {
          res.status(404).json({
            resolved: "success",
            message: "User not found with id " + req.params.userId,
          });
          return;
        }
        res.status(200).json({
          resolved: "success",
          message: "User deleted successfully!",
          data: {
            user: user,
          }
        })
      })
      .catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          res.status(404).json({
            resolved: "failure",
            message: "User not found with id " + req.params.userId,
            error: err,
          })
          return;
        }
        res.status(500).json({
          resolved: "failure",
          message: "Error deleting user with id " + req.params.userId,
          error: err,
        });
      });
  });

}