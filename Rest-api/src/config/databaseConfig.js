const mongoose = require('mongoose')
const {URL} = require('../constants.js')
async function databaseConnect() {
    await mongoose.connect(URL)
}

module.exports = databaseConnect
