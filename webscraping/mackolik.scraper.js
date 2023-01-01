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

           /* const leagueSelector = '.widget-livescore__competition-link';
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
            await page.goto(superLeagueURL);*/
            const response = [];
            if (!req.query) {
                response.push({error: "type is not specified"});
            } else {
                const {...params} = req.query;
                const type = params.type;
                const menuSelector = '.widget-navigation-primary__item .widget-navigation-primary__item--sub';
                await page.waitForSelector(menuSelector);
                const menuItems = await page.$$(menuSelector);
                switch (type) {
                    case "standing":
                        const standingItem = menuItems[0];
                        const standingSelector = 'a.widget-navigation-primary__link--sub';
                        await page.waitForSelector(standingSelector);
                        const standingURL = await standingItem.$eval(standingSelector, el => el.href);
                        await page.goto(standingURL);

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
                    case "fixture":
                        const years = params.years;
                        const fixtureItem = menuItems[1];
                        const fixtureSelector = 'a.widget-navigation-primary__link--sub';
                        await page.waitForSelector(fixtureSelector);
                        const baseFixtureURL = `https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/${years}/fikstur/`;
                        const liveFixtureURL = await fixtureItem.$eval(fixtureSelector, el => el.href);
                        const fixtureURL = baseFixtureURL + liveFixtureURL.substring(liveFixtureURL.lastIndexOf('/'));

                        await page.goto(fixtureURL);

                        const fixtureDaySelector = '.p0c-competition-match-list__day';
                        await page.waitForSelector(fixtureDaySelector);
                        const days = await page.$$(fixtureDaySelector);

                        for (let i = 0; i < days.length; i++) {
                            const day = days[i]
                            const matches = await day.$$('.p0c-competition-match-list__row');
                            for (let j = 0; j < matches.length; j++) {
                                const match = matches[j];
                                const matchTime = await page.$eval(`.p0c-competition-match-list__row:nth-child(${j+1})`, el => el.getAttribute('data-starttime').trim());
                                const homeTeam = await match.$eval('.p0c-competition-match-list__team--home .p0c-competition-match-list__team-full', el => el.textContent.trim());
                                const awayTeam = await match.$eval('.p0c-competition-match-list__team--away .p0c-competition-match-list__team-full', el => el.textContent.trim());
                                const score = await match.$$('.p0c-competition-match-list__score');
                                let scoreHome;
                                let scoreAway;
                                if (score.length > 0) {
                                    scoreHome = (await score[0].getProperty('textContent')).toString().substring(9).trim();
                                    scoreAway = (await score[1].getProperty('textContent')).toString().substring(9).trim();
                                }
                                const matchStatus = await match.$eval('.p0c-competition-match-list__status', el => el.textContent.trim());
                                const matchRes = {
                                    matchYear: years,
                                    matchTime: matchTime,
                                    homeTeam: homeTeam,
                                    awayTeam: awayTeam,
                                    scoreHome: scoreHome,
                                    scoreAway: scoreAway,
                                    matchStatus: matchStatus
                                };
                                response.push(matchRes);
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