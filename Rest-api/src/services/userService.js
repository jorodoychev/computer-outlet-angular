const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.js')
const {SECRET} = require('../constants.js')

exports.login = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('Invalid email or password!')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        throw new Error('Invalid email or password!')
    }

    return generateToken(user)
}

exports.register = async (userData) => {
    const user = await User.exists({email: userData.email})
    if (user) {
        throw new Error('User already exists!')
    }

    try {
        const createdUser = await User.create(userData)
        return await generateToken(createdUser)
    } catch (e) {
        throw new Error(e)
    }
}

async function generateToken(user) {
    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    return await jwt.sign(payload, SECRET, {expiresIn: '3d'})
}
