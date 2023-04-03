#!/usr/bin/env node
const chalk = require('chalk');
const { program } = require('commander');
const { menuItemsExcelAJson, productsExcelToJson } = require('./utils');

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
      '     Objetivo: Crear archivos de data json para backend del Proyect Costo Final     '
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
        'C:\\Users\\Administrador\\Desktop\\WebDesigner\\Backend\\costofinal_xlsx\\costofinal.xlsx',
        'PAGINA DE INICIO',
        './menuProducts.json'
      );
      return;
    }
    if (type === 'products') {
      productsExcelToJson(
        'C:\\Users\\Administrador\\Desktop\\WebDesigner\\Backend\\costofinal_xlsx\\costofinal.xlsx',
        'products.json'
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
program.parse(process.argv);
