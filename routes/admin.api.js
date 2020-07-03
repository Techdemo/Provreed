let Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')
const verifyAdmin = require('../middleware/verifyAdmin')

module.exports = function(app, io) {
//@route GET api/admin/admins
//@desc show all admins
//@acces admin only
  app.get('/api/v1/admin/admins', verifyAdmin, (req, res) => {
    Admin.find()
    .then((admins) => {
      res.status(200).json({
        resolved: 'succes',
        data: {
          admins: admins
        },
      })
    })
    .catch(err => {
      res.status(500).json({
        resolved: 'failure',
        message: 'some error occured while retreving admins',
        error: err
      })
    })
  })


//@route POST api/admin/newAdmin
//@desc create new admin
//@acces admin only
  app.post('/api/v1/admin/create', verifyAdmin, (req, res) => {
    const { password, username } = req.body

    if (!password || !username) {
      res.status(400).json({
        resolved: "failure",
        message: "req.body.user can not be empty",
      });
      return;
    }

    //create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash)=> {
        if(err) throw err;

        const admin = new Admin({
          username,
          password: hash, //String. Required.. Selected
          role: 'admin'
        });

        admin.save()
          .then((admin) => {
            let id = admin.id
            const token = jwt.sign({ id }, "secret", {
              expiresIn: "24h"
            });

            res.status(201).json({
              resolved: "succes",
              data: {
                token,
                admin: {
                  id: admin.id,
                  name: admin.username,
                  role: admin.role
                }
              }
            });
          })
          .catch((err) => {
            res.status(409).json({
              resolved: "failure",
              message: "Maybe because data already exists",
              error: err
            })
          })
      })
    })
  })

//@route POST api/admin/auth
//@desc authenticate admin
//@acces admin only
  app.post('/api/v1/admin/auth', async (req, res) => {
    const { username, password } = req.body

    //validation
    if (!password || !username) {
      return res.status(400).json({
        resolved: "failure",
        message: "fields can not be empty"
      })
    }

    try {
      // check for existing admin
      const admin = await Admin.findOne({ username })
      if (!admin) return res.status(400).json({ msg: "Admin does not exist "})

      const isMatch = await bcrypt.compare(password, admin.password);
      if(!isMatch) throw Error ('invalid credentials')

      const token = jwt.sign({ id: admin._id, role: 'admin' }, 'secret', { expiresIn: 3600 })
      if (!token) throw Error('Could not sign the token');

      res.status(200).json({
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          role: admin.role
        }
      })
    } catch(err) {
      res.status(400).json({ msg: err.message })
    }
  })

//@route GET api/admin/users
//@desc get all Users
//@acces admin only
  app.get('/api/v1/admin/users', verifyAdmin, (req, res) => {
    User.find()
      .then((users) => {
        res.status(200).json({
          resolved: 'succes',
          data: {
            users: users
          },
        })
      })
      .catch(err => {
        res.status(500).json({
          resolved: 'failure',
          message: 'some error occured while retrieving users',
          error: err,
        })
      })
  })

//@route DELETE api/admin/delete/:userId
//@desc Delete a single user
//@acces admin only
  app.delete('/api/v1/admin/delete/:userId', verifyAdmin, (req, res) => {
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

//@route POST api/admin/user/create
//@desc Create a single user with user role
//acces admin only

  app.post('api/v1/admin/user/create', verifyAdmin, (req, res) => {
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
        if (err) throw err;

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

}