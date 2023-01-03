const puppeteer = require('puppeteer');

const main_url = 'https://www.transfermarkt.com.tr/super-lig/schiedsrichter/wettbewerb/TR1/saison_id/2022/plus/1';

module.exports = class TransferMarktScraper {
    static async get(req, res, next)
    {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                ignoreHTTPSErrors: true,
            });
            const page = await browser.newPage();
            await page.goto(main_url);

            const rowSelector = 'tbody tr.odd, tbody tr.even';
            await page.waitForSelector(rowSelector);
            const rows = await page.$$(rowSelector);

            const response = [];
            if (!req.query) {
                response.push({error: "type is not specified"});
            } else {
                const {...params} = req.query;
                const type = params.type;
                const getInfoValue = async (i) => (await i.getProperty('textContent')).toString().substring(9).trim();
                const getInfoValueChildA = async (i) => (await i.$eval('a', el => el.textContent)).trim();
                switch (type) {
                    case "referees":
                        for (let i = 0; i < rows.length; i++) {
                            const row = rows[i];
                            const rowClass = (await row.getProperty('className')).toString().substring(9).trim();
                            if (rowClass !== 'odd' && rowClass !== 'even') {
                                continue;
                            }
                            response.push(
                                {
                                    name: (await row.$eval('td a img', el => el.getAttribute('title'))).trim(),
                                    image: (await row.$eval('td a img', el => el.getAttribute('src'))).trim(),
                                }
                            )
                            const allInfo = await row.$$('td.zentriert, td.rechts');
                            for (let j = 0; j < allInfo.length; j++) {
                                const info = allInfo[j];
                                const infoClass = (await row.getProperty('className')).toString().substring(9).trim();
                                if (infoClass === "") {
                                    continue;
                                }
                                switch (j) {
                                    case 0:
                                        response[i]["firstMatchDate"] = await getInfoValueChildA(info);
                                        break;
                                    case 1:
                                        response[i]["ageAtFirstMatch"] = await getInfoValue(info);
                                        break;
                                    case 2:
                                        response[i]["totalMatches"] = await getInfoValueChildA(info);
                                        break;
                                    case 3:
                                        response[i]["totalYellow"] = await getInfoValue(info);
                                        break;
                                    case 4:
                                        response[i]["averageYellow"] = await getInfoValue(info);
                                        break;
                                    case 5:
                                        response[i]["totalYellowRed"] = await getInfoValue(info);
                                        break;
                                    case 6:
                                        response[i]["averageYellowRed"] = await getInfoValue(info);
                                        break;
                                    case 7:
                                        response[i]["totalRed"] = await getInfoValue(info);
                                        break;
                                    case 8:
                                        response[i]["averageRed"] = await getInfoValue(info);
                                        break;
                                    case 9:
                                        response[i]["totalPenalty"] = await getInfoValue(info);
                                        break;
                                    case 10:
                                        response[i]["averagePenalty"] = await getInfoValue(info);
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