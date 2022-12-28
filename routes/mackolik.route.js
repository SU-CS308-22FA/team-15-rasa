const express = require("express");
const MackolikScraper = require("../webscraping/mackolik.scraper.js");

const mackolikRouter = express.Router()

mackolikRouter.route("/")
    .get(MackolikScraper.get)

module.exports = mackolikRouter;