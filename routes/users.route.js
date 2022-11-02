const express = require("express");
const UsersCtrl = require("./users.controller.js");

const router = express.Router()

router.route("/")
    .get(UsersCtrl.apiGetUsers)
    .post(UsersCtrl.apiCreateUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)

module.exports = router;