let User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')

module.exports = function (app, io) {
// @route POST api/auth
// @desc authenticate user
// @acces public
  app.post('/api/v1/auth', async (req, res) => {
    const { username, password } = req.body
    console.log("username voor de user", username)
    // validation
    if (!password || !username) {
      return res.status(400).json({
        resolved: "failure",
        message: 'fields can not be empty',
    });
    }
    try {
        // check for existing user
      const user = await User.findOne({ username })

      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('invalid credentials');

      const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: 3600 });
      if (!token) throw Error('Could not sign the token');

      res.status(200).json({
        token,
        user: {
          id: user._id,
          username: user.username,
        }
      })
    } catch(err) {
      console.log("in de catch")
      res.status(400).json({ msg: err.message })
    }
  })

// @route GET api/auth/user
// @desc get user data
// @acces private
  app.get('/api/v1/auth/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
  })

}