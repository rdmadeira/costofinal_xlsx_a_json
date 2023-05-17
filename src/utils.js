var XLSX = require('xlsx');
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');

const menuItemsExcelAJson = (excelFilePath, sheetName, jsonPathFile) => {
  const excel = XLSX.readFile(excelFilePath);
  const hoja = excel.Sheets[sheetName];
  const datos = XLSX.utils.sheet_to_json(hoja);

  function transformToNewJson(datos) {
    let newJson = {};
    datos.forEach((element) => {
      Object.keys(element).forEach((key) => {
        if (newJson[key]) {
          newJson[key].push(element[key]);
        } else newJson[key] = [element[key]];
      });
    });
    console.log(newJson);
    return newJson;
  }
  const dataToJson = transformToNewJson(datos);

  fs.writeFileSync(jsonPathFile, JSON.stringify(dataToJson));
  console.log(
    chalk.bgYellow.bold(`
        ----------------- Json productos creado con exito!! ----------------    `)
  );
};

const productsExcelToJson = (excelFilePath, jsonPathFile) => {
  const excel = XLSX.readFile(excelFilePath);
  const sheetNames = excel.SheetNames;
  sheetNames.splice(0, 1); // PRIMERA HOJA NO ESTOY USANDO

  function transformToNewJson() {
    let newJson = {};

    sheetNames.forEach((sheetName) => {
      let newJsonDataObject = {};
      let sheet = excel.Sheets[sheetName];
      let datosSheetName = XLSX.utils.sheet_to_json(sheet);
      datosSheetName.forEach((product) => {
        const productWithId = { ...product, id: uuid.v4() };
        const typeOfProduct = product['TIPO'];
        if (typeOfProduct) {
          if (newJsonDataObject[typeOfProduct]) {
            newJsonDataObject[typeOfProduct].push(productWithId);
          } else {
            newJsonDataObject[typeOfProduct] = [productWithId];
          }

          return;
        }
        if (newJsonDataObject['Sin nombre']) {
          newJsonDataObject['Sin nombre'].push(productWithId);
        } else {
          newJsonDataObject['Sin nombre'] = [productWithId];
        }
      });
      newJson[sheetName] = newJsonDataObject;
    });

    return newJson;
  }
  const dataToJson = transformToNewJson();
  fs.writeFileSync(jsonPathFile, JSON.stringify(dataToJson));
  console.log(
    chalk.bgYellow.black.bold(`
    ----------------- Json productos creado con exito!! ----------------     `)
  );
};

const subProdSheetToJson = (excelFilePath, jsonPathFile, subProdName) => {
  const excel = XLSX.readFile(excelFilePath);
  const sheet = excel.Sheets[subProdName];
  const datosSheetName = XLSX.utils.sheet_to_json(sheet);
  let newJsonDataObject = {};
  datosSheetName.forEach((product) => {
    const productWithId = { ...product, id: uuid.v4() };
    const typeOfProduct = product['TIPO'];
    if (typeOfProduct) {
      if (newJsonDataObject[typeOfProduct]) {
        newJsonDataObject[typeOfProduct].push(productWithId);
      } else {
        newJsonDataObject[typeOfProduct] = [productWithId];
      }

      return;
    }
    if (newJsonDataObject['Sin nombre']) {
      newJsonDataObject['Sin nombre'].push(productWithId);
    } else {
      newJsonDataObject['Sin nombre'] = [productWithId];
    }
  });
  console.log(newJsonDataObject);
  fs.writeFileSync(jsonPathFile, JSON.stringify(newJsonDataObject));
};

/* subProdSheetToJson(
  process.cwd() + '\\costofinal.xlsx',
  process.cwd() + '\\ferreteria.json',
  'FERRETERIA'
); */

const updatePrices = (excelFilePath, jsonPathFile) => {
  console.log(jsonPathFile);
  const excel = XLSX.readFile(excelFilePath);
  const sheet = excel.Sheets['HojaParaActualizar'];
  const datosSheetName = XLSX.utils.sheet_to_json(sheet);

  const products = require('../newProducts.json');
  const productsKeys = Object.keys(products);

  productsKeys.forEach((productKey) => {
    Object.keys(products[productKey]).forEach((subProductoKey) => {
      products[productKey][subProductoKey].forEach((productItem, index) => {
        datosSheetName.forEach((item) => {
          if (
            item.CODIGO === products[productKey][subProductoKey][index].CODIGO
          ) {
            products[productKey][subProductoKey][index].PRECIO = item.PRECIO;
          }
        });
      });
    });
  });

  fs.writeFileSync(jsonPathFile, JSON.stringify(products));

  console.log(`
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!  ACTUALIZADO CON EXITO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  `);
};

module.exports = {
  menuItemsExcelAJson,
  productsExcelToJson,
  subProdSheetToJson,
  updatePrices,
};
