const ExcelJS = require('exceljs');
const fs = require('fs');

const FILE_NAME = 'T-shirts_Data-.xlsx';

class Utils {

    async elementExists(selector) {
        await selector.waitForDisplayed({ timeout: 4000 });
        await expect(selector).toBeDisplayed();
    }

    async excelCreator(items) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(FILE_NAME);

        worksheet.addRow(['Name', 'Price', 'Link']);

        for (const item of items) {
            worksheet.addRow([item.name, item.price, item.link]);
        }

        const filePath = '../reports/'+ FILE_NAME;
        await workbook.xlsx.writeFile(filePath);
    }

    async isFileCreated() {
        try {
            fs.accessSync(FILE_NAME);
            console.log(`El archivo "${FILE_NAME}" existe en el directorio actual.`);
            return true;
        } catch (error) {
            console.log(`El archivo "${FILE_NAME}" no existe en el directorio actual.`);
            return false;
        }
    }

}

module.exports = new Utils();