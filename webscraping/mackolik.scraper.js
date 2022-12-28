const cheerio = require('cheerio');
const axios = require('axios');
const puppeteer = require('puppeteer');

const main_url = 'https://www.mackolik.com/canli-sonuclar';

module.exports = class MackolikScraper {
    static async get(req, res, next)
    {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: true,
            });
            const page = await browser.newPage();
            await page.goto(main_url);

            const leagueSelector = '.widget-livescore__competition-link';
            await page.waitForSelector(leagueSelector);

            const allLeagues = await page.$$(leagueSelector);
            const leagueNameSelector = '.widget-livescore__competition-name--full';
            await page.waitForSelector(leagueNameSelector);
            let superLeagueURL;
            for (let i = 0; i < allLeagues.length; i++) {
                const league = allLeagues[i];
                const leagueName = (await league.$eval(leagueNameSelector, el => el.textContent)).trim();
                if (leagueName === 'Süper Lig') {
                    await league.getProperty('href')
                        .then((href) => {
                            superLeagueURL = href.toString().substring(9);
                        });
                    break;
                }
            }
            await page.goto(superLeagueURL);
            const response = [];
            if (!req.query) {
                response.push({error: "type is not specified"});
            } else {
                const {...params} = req.query;
                const type = params.type;
                switch (type) {
                    case "standing":
                        const rowSelector = '.p0c-competition-tables__row';
                        await page.waitForSelector(rowSelector);
                        const allRows = await page.$$(rowSelector);

                        for (let i = 0; i < allRows.length; i++) {
                            const row = allRows[i];
                            const teamRank = await row.$eval('.p0c-competition-tables__rank', el => el.textContent);
                            const teamName = await row.$eval('.p0c-competition-tables__team-name', el => el.textContent);
                            const stats = await row.$$('td');
                            response.push({
                                teamRank: teamRank.trim(),
                                teamName: teamName.trim(),
                            });
                            for (let j = 0; j < stats.length; j++) {
                                const stat = stats[j];
                                const statValue = (await stat.getProperty('textContent')).toString().substring(9).trim();
                                switch (j) {
                                    case 3:
                                        response[i]["O"] = statValue;
                                        break;
                                    case 5:
                                        response[i]["G"] = statValue;
                                        break;
                                    case 6:
                                        response[i]["B"] = statValue;
                                        break;
                                    case 7:
                                        response[i]["M"] = statValue;
                                        break;
                                    case 8:
                                        response[i]["A"] = statValue;
                                        break;
                                    case 9:
                                        response[i]["Y"] = statValue;
                                        break;
                                    case 10:
                                        response[i]["AV"] = statValue;
                                        break;
                                    case 11:
                                        response[i]["P"] = statValue;
                                        break;
                                    default:
                                        break;
                                    }
                                }
                            }
                        break;
                    default:
                        response.push({error: "type is not valid"});
                        break;
                }
            }

            res.json(response);
            await browser.close();
        } catch (error) {
            res.json({error: error.toString()});
        }
    }
};