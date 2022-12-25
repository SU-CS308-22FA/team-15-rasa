const express = require("express");
const SportRadarScraper = require("../webscraping/sportradar.scraper.js");

const sportRadarRouter = express.Router()

sportRadarRouter.route("/")
    .get(SportRadarScraper.getMatchData)

module.exports = sportRadarRouter;