const { $ } = require('@wdio/globals')
const Page = require('./page');
const Utils = require('../utils/utils')

const product = 'camisetas';

class LoginPage extends Page {

    // HOME PAGE SELECTORS

    get searchBar() {
        return $('.nav-search-input#cb1-edit');
    }

    get header() {
        return $('[role="banner"]');
    }

    get searchTitle() {
        return $(`h1=${product}`)
    }

    get searchBtn() {
        return $('button[type="submit"]')
    }

    get itemContainer() {
        return $$('.shops__item-title');
    }

    get productName() {
        return $$('.andes-card');
    }

    get productPrice() {
        return $$('span.andes-money-amount');
    }

    get productLink() {
        // return null;
        return $(`a[title="${this.productName.getValue()}"]`)
    }

    // HOME PAGE FUNCTIONS
    async goToMeLiWebsite() {
        await this.open();
        await Utils.elementExists(this.header);
    }

    async searchProduct() {
        await Utils.elementExists(this.searchBar);
        await this.searchBar.setValue(product);
        (await this.searchBtn).click();
        (await this.searchTitle).waitForDisplayed({ timeout: 5000 });
    }

    async collectDataAndCreateExcel() {
        const data = Utils.dataExtractor(this.itemContainer, this.productName, this.productPrice, this.productLink);
        await Utils.excelCreator(data);
    }
}

/**
 * no se esta formando bien el json, no guarda las keys correctamente
 */

module.exports = new LoginPage();
