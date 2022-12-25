const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

const url = 'https://widgets.sir.sportradar.com/live-match-tracker';

module.exports = class SportRadarScraper {
    static async getMatchData(req, res, next) {
        try {
            const browser = await puppeteer.launch({
                    args: chromium.args,
                    executablePath: process.env.CHROME_EXECUTABLE_PATH || await chromium.executablePath,
                    headless: false
                });
            const page = await browser.newPage();
            await page.goto(url);

            const menuSelector = '.d-hamburger__navbar-toggle';
            await page.waitForSelector(menuSelector);
            await page.click(menuSelector, {delay: 1000});

            const countrySelector = '.sr-ml-list__realcategory-wrapper';
            const allCountries =  await page.$$(countrySelector);

            let turkeyExpand;
            for (let i = 0; i < allCountries.length; i++) {
                const country = allCountries[i];
                const countryName = await country.$eval('.sr-ml-list__realcategory-name', el => el.textContent);
                if (countryName === 'Turkiye') {
                    turkeyExpand = await country.$('.sr-ml-list__collapse-header');
                    break;
                }
            }
            await turkeyExpand.click({delay: 1000});

            const leagueSelector = '.sr-ml-list__collapse-item .sr-ml-list__collapse-item-active';
            const allLeagues = await page.$$(leagueSelector);

            let superLeagueMatches;
            for (let i = 0; i < allLeagues.length; i++) {
                const league = allLeagues[i];
                const leagueName = await league.$eval('.sr-ml-list__tournament-name', el => el.textContent);
                if (leagueName === 'Super Lig') {
                    superLeagueMatches = await league.$('.sr-ml-list__matches');
                    break;
                }
            }

            const matches = await superLeagueMatches.$$eval('.sr-match__wrapper', matches => matches.map(match => {
                const matchID = match.getAttribute('data-sr-match-id');
                const homeTeam = match.querySelector('.srm-left').textContent;
                const awayTeam = match.querySelector('.srm-right').textContent;

                return { matchID: matchID, homeTeam: homeTeam, awayTeam: awayTeam};
            }));
            await browser.close();

            res.json(matches);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}