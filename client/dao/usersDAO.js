const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId
let users

module.exports = class UsersDAO {
    static async injectDB(conn) {
        if (users) {
            return
        }
        try {
            users = await conn.db(process.env.users).collection("usernames")
        } catch (e) {
            console.error(
                `Unable to establish a collection handle in usersDAO: ${e}`,
            )
        }
    }

    static async registerUser(
        username,
        email,
        password
    ) {
        try {
            const userDoc = {
                _id: new ObjectId,
                username: username,
                email: email,
                password: password
            }
            return await users.insertOne(userDoc)
        } catch (e) {
            console.error(`Unable to post user: ${e}`)
            return { error: e }
        }
    }

    static async updateUser(
        _id,
        username,
        email,
        password
    ) {
        try {
            const updateResponse = await users.updateOne(
                { _id: new ObjectId(_id) },
                { $set: { username: username, password: password , email: email} },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return { error: e }
        }
    }

    static async deleteUser(_id) {
        try {
            const deleteResponse = await users.deleteOne({
                _id: new ObjectId(_id),
            })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete user: ${e}`)
            return { error: e }
        }
    }

    static async getUsers({
        filters = null,
        page = 0,
        usersPerPage = 20,
                          } = {}) {
        let query
        if (filters) {
            if ("username" in filters) {
                query = { "username": { $eq: filters["username"]} }
            } else if ("email" in filters) {
                query = { "email": { $eq: filters["email"]} }
            } else if ("id" in filters) {
                query = { "_id": new ObjectId(filters["id"]) }
            }
        }

        let cursor

        try {
            cursor = await users.find(query)
        } catch (e) {
            console.error(`unable to issue find command, ${e}`)
            return { usersList: [], totalNumUsers: 0}
        }

        const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page)

        try {
            const usersList = await displayCursor.toArray()
            const totalNumUsers = await users.countDocuments(query)

            return { usersList, totalNumUsers}
        } catch (e) {
            console.error(
                'unable to convert cursor to array or problem with counting documents'
            )
            return { usersList: [], totalNumUsers: 0 }
        }
    }
}