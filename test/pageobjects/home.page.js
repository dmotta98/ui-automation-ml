const { $ } = require('@wdio/globals')
const Page = require('./page');
const Utils = require('../utils/utils')

const product = 'camisetas';

class HomePage extends Page {

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

    get productsList() {
        return $$('div.andes-card.ui-search-result.shops__cardStyles.ui-search-result--core.andes-card--flat.andes-card--padding-16');
    }

    get productName() {
        return $('.andes-card.ui-search-result');
    }

    get productPrice() {
        return $('.andes-money-amount__currency-symbol + .andes-money-amount__fraction');
    }

    get productLink() {
        return $(`.ui-search-link`);
    }

    get nextPage() {
        return $('a[title="Siguiente"]');
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
        // await $$('.ui-search-layout__item.shops__layout-item').waitForDisplayed({ timeout: 5000 });
        await this.dataExtractor();
        // await Utils.excelCreator();
    }

    async dataExtractor() {
        const productsJsonArray = [];
        const products = [];
        const lista = this.productsList;

        // for(let page=0; page<=3; page++) {
            for(const element of lista) {
                await element.waitForDisplayed({ timeout: 5000 });

                const name = element.$(this.productName).getText();
                const price = element.$(this.productPrice).getText();
                const link = element.$(this.productLink).getAttribute('href');

                console.log('----------------------------- VALORES ------------------')
                console.log(name, price, link);
                console.log('----------------------------- VALORES ------------------')

                products.push({
                    "name": name,
                    "price": price,
                    "link": link
                });
            }
            
            productsJsonArray.push(...products);

            // if(page<3){
            //     (await this.nextPage).waitForDisplayed({ timeout: 4000 });
            //     (await this.nextPage).click(); 
            // }
        // }
        console.log(productsJsonArray);
        return productsJsonArray;
    }
}

module.exports = new HomePage();
