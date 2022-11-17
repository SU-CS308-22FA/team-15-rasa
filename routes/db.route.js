const express = require("express");
const DBCtrl = require("./db.controller.js");

const dbRouter = express.Router()

dbRouter.route("/")
    .get(DBCtrl.apiGetItems)
    .post(DBCtrl.apiAddItem)
    .put(DBCtrl.apiUpdateItem)
    .delete(DBCtrl.apiDeleteItem)

module.exports = dbRouter;