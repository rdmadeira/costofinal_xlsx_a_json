var XLSX = require('xlsx');
const fs = require('fs');
const chalk = require('chalk');
const uuid = require('uuid');
const { getProductsFromFirestore } = require('./firebase-utils.js');

const menuItemsExcelAJson = (excelFile, sheetName, jsonFile) => {
  const excel = XLSX.readFile('./xls/' + excelFile);
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

  fs.writeFileSync(__dirname + '/json/' + jsonFile, JSON.stringify(dataToJson));
  console.log(
    chalk.bgYellow.bold(`
        ----------------- Json productos creado con exito!! ----------------    `)
  );
};

const productsExcelToJson = (excelFile, jsonFile) => {
  const excel = XLSX.readFile(__dirname + '/xls' + excelFile);
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
  fs.writeFileSync(__dirname + '/json/' + jsonFile, JSON.stringify(dataToJson));
  console.log(
    chalk.bgYellow.black.bold(`
    ----------------- Json productos creado con exito!! ----------------     `)
  );
};

const subProdSheetToJson = (excelFile, jsonFile, subProdName) => {
  const excel = XLSX.readFile(__dirname + '/xls' + excelFile);
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
  fs.writeFileSync(
    __dirname + '/json/' + jsonFile,
    JSON.stringify(newJsonDataObject)
  );
};

const updatePrices = (excelFile, jsonFile) => {
  const excel = XLSX.readFile(__dirname + '/xls/' + excelFile);
  const sheet = excel.Sheets['HojaParaActualizar'];
  const datosSheetName = XLSX.utils.sheet_to_json(sheet);
  console.log(datosSheetName);

  const products = require(__dirname + '/json/productsFirebaseJson.json');
  const productsKeys = Object.keys(products);

  productsKeys.forEach((productKey) => {
    Object.keys(products[productKey]).forEach((subProductoKey) => {
      products[productKey][subProductoKey].forEach((productItem, index) => {
        datosSheetName.forEach((item) => {
          if (
            item.CODIGO == products[productKey][subProductoKey][index].CODIGO
          ) {
            products[productKey][subProductoKey][index].PRECIO = item.PRECIO;
          }
        });
      });
    });
  });

  fs.writeFileSync(__dirname + '/json/' + jsonFile, JSON.stringify(products));

  console.log(`
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!  ACTUALIZADO CON EXITO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  `);
};

const createJsonFileFromObject = (jsonObject, collectionName) => {
  const jsonStringfy = JSON.stringify(jsonObject);
  fs.writeFileSync(
    __dirname + '/json/' + collectionName + 'FirebaseJson.json',
    jsonStringfy
  );
};

const createAsyncJsonFromDB = async (collectionName) => {
  const productsFromDB = await getProductsFromFirestore(collectionName);
  console.log(productsFromDB);

  createJsonFileFromObject(productsFromDB.data, collectionName);
};

module.exports = { createAsyncJsonFromDB };

module.exports = {
  menuItemsExcelAJson,
  productsExcelToJson,
  subProdSheetToJson,
  updatePrices,
  createAsyncJsonFromDB,
};
