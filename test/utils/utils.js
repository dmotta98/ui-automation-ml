const fs = require('fs');

class Utils {

    async elementExists(selector) {
        await selector.waitForDisplayed({ timeout: 4000 });
        await expect(selector).toBeDisplayed();
    }

    async createFile(collectedData) {
        const date = new Date(Date.now()).toISOString();
        const csvContent = 'Name,Price,Link\n' + collectedData.map(item => Object.values(item).join(',')).join('\n');

        fs.writeFile(`./scraped_items-${date}.csv`, csvContent, 'utf8', (err) => {
            if (err) {
                console.error('An error occurred while writing the file:', err);
                return;
            }

            console.log('The file was saved!');
        });

        console.log('Scraped Items:', collectedData);
    }

}

module.exports = new Utils();