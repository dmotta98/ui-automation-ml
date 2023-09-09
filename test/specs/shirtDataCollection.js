const HomePage = require('../pageobjects/home.page');

describe('Mercado Libre Scraper', () => {

    before(async () => {
        await browser.maximizeWindow();
    });

    it('should scrape the first three pages of search results', async () => {
        await HomePage.goToMeLiWebsite();
        await HomePage.searchProduct();
        await HomePage.scrapItems();
    });
});
