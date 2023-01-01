const puppeteer = require('puppeteer');

const url = 'https://widgets.sir.sportradar.com/live-match-tracker';

module.exports = class SportRadarScraper {
    static async getMatchData(req, res, next) {
        try {
            let countryNameDesired = "Turkiye";
            let leagueNameDesired = "Super Lig";
            if (req.query) {
                const {...params} = req.query;
                if (params.country) {
                    countryNameDesired = params.country;
                }
                if (params.league) {
                    leagueNameDesired = params.league;
                }
            }
            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: true,
            });

            const page = await browser.newPage();
            await page.goto(url);
            const menuSelector = '.d-hamburger__navbar-toggle';
            await page.waitForSelector(menuSelector);
            await page.click(menuSelector);

            const countrySelector = '.sr-ml-list__realcategory-wrapper';
            await page.waitForSelector(countrySelector);
            const allCountries =  await page.$$(countrySelector);

            let turkeyExpand;
            for (let i = 0; i < allCountries.length; i++) {
                const country = allCountries[i];
                const countryName = await country.$eval('.sr-ml-list__realcategory-name', el => el.textContent);
                if (countryName === countryNameDesired) {
                    turkeyExpand = await country.$('.sr-ml-list__collapse-header');
                    break;
                }
            }
            if (!turkeyExpand) {
                await browser.close();
                res.json([]);
                return;
            }
            await turkeyExpand.click();

            const leagueSelector = '.sr-ml-list__collapse-item .sr-ml-list__collapse-item-active';
            await page.waitForSelector(leagueSelector);
            const allLeagues = await page.$$(leagueSelector);

            let superLeagueMatches;
            for (let i = 0; i < allLeagues.length; i++) {
                const league = allLeagues[i];
                const leagueName = await league.$eval('.sr-ml-list__tournament-name', el => el.textContent);
                if (leagueName === leagueNameDesired) {
                    superLeagueMatches = await league.$('.sr-ml-list__matches');
                    break;
                }
            }
            if (!superLeagueMatches) {
                await browser.close();
                res.json([]);
                return;
            }
            const matches = await superLeagueMatches.$$eval('.sr-match__wrapper', matches => matches.map(match => {
                const matchID = match.getAttribute('data-sr-match-id');
                const homeTeam = match.querySelector('.srm-left').textContent;
                const awayTeam = match.querySelector('.srm-right').textContent;
                const status = match.querySelector('.sr-match-default__status-str.srm-1.srm-is-uppercase');
                let matchEnded = false;
                if (status && status.textContent === 'End') {
                    matchEnded = true;
                }
                return { matchID: matchID, homeTeam: homeTeam, awayTeam: awayTeam, matchEnded: matchEnded };
            }));
            await browser.close();

            res.json(matches);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}