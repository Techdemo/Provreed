let Admin = require('../models/Admin')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')

module.exports = function(app, io) {
//@route GET api/admin/admins
//@desc show all admins
//@acces admin only
  app.get('/api/v1/admin/read', auth, (req, res) => {

  })


//@route POST api/admin/newAdmin
//@desc create new user with admin acces
//@acces admin only
  app.post('/api/v1/admin/create', (req, res) => {
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
            console.log(admin)
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
      console.log("catch err", err)
      res.status(400).json({ msg: err.message })
    }
  })
}