const express = require('express')
const { getAllUser, user } = require('../controller/user.controller')
const router = express.Router()


router.get('/', getAllUser)
router.put('/', user)


module.exports = router