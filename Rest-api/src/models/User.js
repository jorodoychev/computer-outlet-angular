const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {SALT} = require('../constants.js')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [3, 'Username must be at least 3 characters long'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email must be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
        minLength: [4, 'Password must be at least 4 characters long'],
    },
})

userSchema.virtual('repeatPassword').set(function (value) {
    if (this.password !== value) {
        throw new Error('Password mismatch!')
    }
})

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, SALT)
})

const User = mongoose.model('User', userSchema)

module.exports = User
