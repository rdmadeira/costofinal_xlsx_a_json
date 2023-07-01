#!/usr/bin/env node
const chalk = require('chalk');
const { program } = require('commander');
const {
  menuItemsExcelAJson,
  productsExcelToJson,
  updatePrices,
} = require('./utils');
const { sendAllProductsJsonToDB } = require('./firebase-utils.js');
const { createAsyncJsonFromDB } = require('./utils.js');

program
  .version('1.0.0')
  .name(
    chalk.bgBlueBright(
      `

      ######################### Costo Final data json Creater #############################
      
      
`
    )
  )
  .description(
    chalk.bgBlueBright(
      '     Objetivo: Crear o modificar archivos de data json para backend del Proyect Costo Final     '
    )
  );

program
  .command('new')
  .description(
    chalk.bgBlueBright(
      `
      Crea un archivo Json a depender del tipo declarado: - arguments: -----    
        menu -> Crea un archivo json para el menu del sitio; ---------------    
        products -> Crea un archivo json para la base de datos del sitio web    
`
    )
  )
  .alias('n')
  .arguments('<type>')
  .action((type) => {
    if (type === 'menu') {
      menuItemsExcelAJson(
        process.cwd() + '\\costofinal.xlsx',
        'PAGINA DE INICIO',
        './menuProducts.json'
      );
      return;
    }
    if (type === 'products') {
      productsExcelToJson(
        process.cwd() + '\\costofinal.xlsx',
        'newProducts.json'
      );
      return;
    }
    console.log(
      chalk.red(`
    -----------------------------------------------------------------
                      Enter a valid argument                   
    -----------------------------------------------------------------
                      `)
    );
  });

program
  .command('getCollectionFromDB')
  .description(
    'Obtener los datos de products de la base de datos en formato json y grabar en la raiz del proyecto '
  )
  .alias('gc')
  .argument(
    '<collectionName>',
    'nombre de la collecion en Firestore a ser obtenida'
  )
  .action((collectionName) => {
    createAsyncJsonFromDB(collectionName)
      .then(() => console.log('ProductsFirebaseJson Creado con exito'))
      .catch((error) => console.log(error));
  });

program
  .command('updatePrices')
  .description('Actualizar precios acorde archivo excel')
  .alias('up')
  .argument('<excelFilePath>', 'Path del archivo excel')
  .argument('<jsonFilePath>', 'Path del archivo json a ser creado')
  .action((excelFilePath, jsonFile) => {
    updatePrices(excelFilePath, jsonFile);
  });

program
  .command('PostToDB')
  .description('Enviar Json a Firestore')
  .alias('post')
  .argument('<collectionName>', 'Nombre de la colección a ser seteada')
  .argument('<jsonFilePath>', 'Path del archivo json a ser enviado')
  .action((collectionName, jsonFile) => {
    var productsObject = require('./json/' + jsonFile);
    sendAllProductsJsonToDB(collectionName, productsObject)
      .then(() => console.log('Actualizado con exito en la base de datos'))
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  });

program.parse(process.argv);
