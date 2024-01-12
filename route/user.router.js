const express = require('express')
const { getAllUser, getUser } = require('../controller/user.controller')
const router = express.Router()


router.get('/', getAllUser)
router.put('/', getUser)


module.exports = router