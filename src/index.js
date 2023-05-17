#!/usr/bin/env node
const chalk = require('chalk');
const { program } = require('commander');
const {
  menuItemsExcelAJson,
  productsExcelToJson,
  updatePrices,
} = require('./utils');

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
  .command('updatePrices')
  .description('Actualizar precios acorde archivo excel')
  .alias('up')
  .argument('<excelFilePath>', 'Path del archivo excel')
  .argument('<jsonFilePath>', 'Path del archivo json a ser creado')
  .action((excelFilePath, jsonPathFile) => {
    updatePrices(excelFilePath, jsonPathFile);
  });

program.parse(process.argv);
