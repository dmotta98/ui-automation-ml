const HomePage = require('../pageobjects/home.page');
const Utils = require('../utils/utils')

describe('Collect "camisetas" data from the first three pages of Mercado Libre', async () => {

    it('Search for "camisetas" and create excel with collected data', async () => {
        await HomePage.goToMeLiWebsite();
        await HomePage.searchProduct();
        await HomePage.collectDataAndCreateExcel();
        // await expect(Utils.isFileCreated).toBeTrue();
    });
})