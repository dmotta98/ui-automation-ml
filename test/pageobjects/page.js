const { browser } = require('@wdio/globals')

module.exports = class Page {

    open () {
        return browser.url(`https://www.mercadolibre.com.uy/`)
    }

}
