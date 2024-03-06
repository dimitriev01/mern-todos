const config = require('config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(401).json({ status: 'error', errors: [`Unauthorized`] })
    }

    const closedKey = jwt.verify(token, config.get('jwtKey'))
    req.user = closedKey;
    next()
  } catch (error) {
    res.status(401).json({ status: 'error', errors: [error.message] })
  }
}