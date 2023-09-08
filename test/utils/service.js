const puppeteer = require('puppeteer');

const init = async () => {
    const header = randomUseragent().getRandom();

    const browser = await puppeteer.launch();

}

init();