/*
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const main_url = 'https://arsiv.mackolik.com/Canli-Sonuclar';
const points_url = 'https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/482ofyysbdbeoxauk19yg7tdt';
const fixture_url = 'https://www.mackolik.com/puan-durumu/t%C3%BCrkiye-s%C3%BCper-lig/fikstur/482ofyysbdbeoxauk19yg7tdt';

async function getSuperLigURL(page) {
    const html = await page.content();
    const $ = cheerio.load(html);
    return 'https:' + $('a:contains(" - Süper Lig")').attr('href');
}

async function getMatchData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(main_url);

    const superLigUrl = await getSuperLigURL(page);

    await page.goto(superLigUrl);
    const html = await page.content();
    const $ = cheerio.load(html);

    const teams = [];

    const standingRows = $('.alt1 .puan_row');
    standingRows.each((_, element) => {
       const row = $(element);
       const teamName = $(row('.style3')).text().trim();
       const teamUrl = 'https:' + $(row('.style3')).attr('href');
       teams.push({ teamName: teamName, teamUrl: teamUrl });
    });

    await browser.close();
    return teams;
}*/
