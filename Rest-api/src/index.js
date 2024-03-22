const express = require('express')
const handlebarsConfig = require('./config/handlebarsConfig.js')
const expressConfig = require('./config/expressConfig.js')
const routes = require('./routes.js')
const {PORT} = require('./constants.js')
const databaseConnect = require('./config/databaseConfig.js')
const cookieParser = require('cookie-parser')
const {auth} = require('./middlewares/authMiddleware.js')

const app = express()

handlebarsConfig(app)
expressConfig(app)
app.use(cookieParser())
app.use(auth)

databaseConnect()
    .then(() => console.log('Successfully connected to the database'))
    .catch((e) => console.log('Error', e))


app.use(routes)

app.listen(PORT, () => console.log(`Server is listening at port ${PORT}`))
