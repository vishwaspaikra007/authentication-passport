const express = require('express')
const router = express.Router()
require('./refreshTokenFunc')()

router.get('/refreshToken', (req, res) => refreshTokenFunc(req, res))

module.exports = router