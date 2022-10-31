import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import usersDAO from './dao/usersDAO.js'
dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.USERS_DB_URI
).catch(err => {
    console.error(err.stack) // log error
    process.exit(1) // exit with error
}).then(async client => {
    await usersDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})