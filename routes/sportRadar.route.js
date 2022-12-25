const express = require("express");
const SportRadarScraper = require("../WebScraping/sportRadarScraper.js");

const sportRadarRouter = express.Router()

sportRadarRouter.route("/")
    .get(SportRadarScraper.getMatchData)

module.exports = sportRadarRouter;