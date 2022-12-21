const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://widgets.sir.sportradar.com/betradar/en/live-match-tracker';

async function getMatchData() {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        console.log(response.data);
        const matches = [];
        const countries = [];
        $("div").each((_, element) => {
            // countries.push($(element));
            console.log($(element).attr('class'));
        });
        console.log(countries);
    } catch (error) {
        console.error(error);
    }
}

getMatchData();