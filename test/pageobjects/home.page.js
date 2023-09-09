const { $ } = require('@wdio/globals')
const Page = require('./page');
const Utils = require('../utils/utils')


class HomePage extends Page {
    product = 'camisetas';
    numPages = 3;

    get searchInput() { return $('input.nav-search-input'); }
    get searchButton() { return $('button.nav-search-btn'); }
    get items() { return $$('li.shops__layout-item'); }
    get nextPage() { return $('a[title="Siguiente"]'); }

    async getItemName(item) { return item.$('.ui-search-item__title').getText(); }
    async getItemPrice(item) { return item.$('.andes-money-amount__fraction').getText(); }
    async getItemLink(item) { return item.$('a.ui-search-link').getAttribute('href'); }

    async goToMeLiWebsite() {
        await this.open();
    }

    async searchProduct(){
        await this.searchInput.setValue(this.product);
        await this.searchButton.click();
    }

    async goToNextPage() {
        await this.nextPage.scrollIntoView();
        await this.nextPage.waitForDisplayed({ timeout: 4000 });
        await this.nextPage.click();
    }

    async scrapItems() {
        const scrapedItems = [];
        for (let page = 1; page <= this.numPages; page++) {
            const items = await this.items;
            for (const item of items) {
                const product = await this.getItemName(item);
                const price = await this.getItemPrice(item);
                const link = await this.getItemLink(item);
                scrapedItems.push({ product, price, link });
            }

            if (page < 3) {
                await this.goToNextPage();
            }
        }
        await Utils.createFile(scrapedItems);
    }

}

module.exports = new HomePage();
