const mongoose = require('mongoose')
require('dotenv').config()

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL)
    .then(() => {
    console.log('MongoDB atlas is connected')
    })
    .catch(error => {
    console.log(error)
    process.exit(1)
    })



module.exports = mongoose