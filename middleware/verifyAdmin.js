const jwt = require('jsonwebtoken')

function verifyAdmin(req,res, next) {
  const token = req.header('x-auth-token');

  if(!token){
    return res.status(401).json({ msg: 'No token, authorizaton denied'})
  }

  try {
    //verify token
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    if(req.user.role === 'admin'){
      next()
    } else {
      throw Error
    }
  } catch (e) {
    res.status(400).json({ msg: 'User is not an admin or token is not valid'})
  }
}

module.exports = verifyAdmin