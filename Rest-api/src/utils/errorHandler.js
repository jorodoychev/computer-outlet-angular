const {MongooseError} = require('mongoose')

exports.getErrorMessage = (e) => {
    if (e instanceof MongooseError) {
        return Object.values(e.errors)[0].message
    } else {
        return e.message
    }
}
