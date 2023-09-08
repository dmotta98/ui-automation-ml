const XLSX = require('xlsx');
const fs = require('fs');
const dataDto = require('../utils/dataProductDTO')

const FILE_NAME = 'productsData.xlsx';

class Utils {

    async elementExists(selector) {
        await selector.waitForDisplayed({ timeout: 4000 });
        await expect(selector).toBeDisplayed();
    }

    async excelCreator(data) {
        console.log("----------------------------")
        console.log("EL JSON QUE LLEGA AL EXCEL ES ESTE",data);
        console.log("----------------------------")
        
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // Save the Excel file
        fs.writeFileSync(FILE_NAME, excelBuffer);

        console.log(`Excel file "${FILE_NAME}" created successfully.`);
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


    async dataExtractor(items, productName, productPrice, productLink) {
        const productsJsonArray = [];
        const products = [];

        for(let page=0; page<=3; page++) {
            for(let i=0; i<items.length; i++){
                const name = items[i].$(productName).getValue();
                const price = items[i].$(productPrice).getValue();
                const link = items[i].$(productLink).getValue();

                return products.push({
                    "name": name,
                    "price": price,
                    "link": link
                });
            }
            
            productsJsonArray.push(...products);

            if(page<3){
            /**
             * next de pagina
             */
            }
        }
    }

}

module.exports = new Utils();