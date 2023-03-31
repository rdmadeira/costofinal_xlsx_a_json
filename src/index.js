var XLSX = require('xlsx');

const excelAJson = () => {
  const excel = XLSX.readFile(
    'C:\\Users\\Administrador\\Desktop\\WebDesigner\\Backend\\costofinal_xlsx\\costofinal.xlsx'
  );
  const nombresHojas = excel.SheetNames;
  const datos = XLSX.utils.sheet_to_json(excel.Sheets[nombresHojas[1]]);
  console.log(datos);
};

excelAJson();
