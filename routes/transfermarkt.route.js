const express = require("express");
const TransferMarktScraper = require("../webscraping/transfermarkt.scraper.js");

const transferMarktRouter = express.Router()

transferMarktRouter.route("/")
    .get(TransferMarktScraper.get)

module.exports = transferMarktRouter;