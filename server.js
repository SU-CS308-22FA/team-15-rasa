const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const dbRouter = require("./routes/db.route.js");
const genericDAO = require("./dao/genericDAO.js");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = express();
const PORT = process.env.PORT || 8080;

const MongoClient = mongodb.MongoClient;
const uri =
  process.env.USERS_DB_URI ||
  "mongodb+srv://rasaReadWrite:T9AxKEQTnw5gYn0B@rasacluster.dxdtcrw.mongodb.net/users?retryWrites=true&w=majority";

MongoClient.connect(uri)
  .catch((err) => {
    console.error(err.stack); // log error
    process.exit(1); // exit with error
  })
  .then(async (client) => {
    //await usersDAO.injectDB(client);
    await genericDAO.injectDB(client);
    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", dbRouter);
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("client/build"));
    }
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  });
