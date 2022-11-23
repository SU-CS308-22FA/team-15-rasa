const mongodb = require("mongodb")
const ObjectId = mongodb.ObjectId
let db

module.exports = class genericDAO {
    static async injectDB(conn) {
        if (db) {
            return
        }
        try {
            db = await conn.db(process.env.db)
        } catch (e) {
            console.error(
                `Unable to establish a connection to the db: ${e}`,
            )
        }
    }

    static async addItem(item, collection) {
        try {
            item._id = new ObjectId
            return await db.collection(collection).insertOne(item)
        } catch (e) {
            console.error(`Unable to add item: ${e}`)
            return { error: e }
        }
    }

    static async updateItem(item, collection) {
        try {
            let { _id, ...update } = item
            return await db.collection(collection).updateOne(
                {_id: new ObjectId(_id)},
                {$set: update},
            )
        } catch (e) {
            console.error(`Unable to update item: ${e}`)
            return { error: e }
        }
    }

    static async deleteItem(_id, collection) {
        try {
            return await db.collection(collection).deleteOne({
                _id: new ObjectId(_id),
            })
        } catch (e) {
            console.error(`Unable to delete item: ${e}`)
            return { error: e }
        }
    }

    static async getItems(filters = null, collection) {
        if(filters._id){
            filters._id = new ObjectId(filters._id)
        }

        let result

        try {
            result = await db.collection(collection).find(filters)
        } catch (e) {
            console.error(`unable to issue find command, ${e}`)
            return { usersList: [], totalNumUsers: 0}
        }

        try {
            const itemsList = await result.toArray()
            const totalNumItems = await db.collection(collection).countDocuments(filters)

            return { itemsList, totalNumItems }
        } catch (e) {
            console.error(
                `unable to convert cursor to array or problem with counting documents: ${e}`,
            )
            return { itemsList: [], totalNumItems: 0 }
        }
    }
}