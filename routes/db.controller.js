const GenericDAO = require("../dao/genericDAO.js")

module.exports = class DBCtrl {
    static async apiGetItems(req, res, next) {
        let {_collection, ...filters } = req.query;
        const { itemsList, totalNumItems } = await GenericDAO.getItems(filters, _collection);

        let response = {
            items: itemsList,
            filters: filters,
            total_results: totalNumItems,
        }
        res.json(response);
    }

    static async apiAddItem(req, res, next) {
        try {
            let { _collection, ...item } = req.body;
            await GenericDAO.addItem(item, _collection);

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUpdateItem(req, res, next) {
        try {
            let { _collection, ...item } = req.body;
            const UserResponse = await GenericDAO.updateItem(item, _collection);
            if (UserResponse.error) {
                res.status(400).json({ error: UserResponse.error });
            } else if (UserResponse.modifiedCount === 0) {
                res.status(500).json({ error: "unable to update item - item may not be found" });
            } else {
                res.json({status: "success"});
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteItem(req, res, next) {
        try {
            let { _collection, _id } = req.body;
            const UserResponse = await GenericDAO.deleteItem(_id, _collection);
            if (UserResponse.modifiedCount === 0) {
                res.status(500).json({ error: "unable to delete item - item may not be found" });
            } else {
                res.json({ status: "success" });
            }
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
