# costofinal_xlsx_a_json

## Actualización de Precios - Paso a Paso:

CAMBIAR EL EXCEL:

1. Grabar el excel de los codigos y los precios en la raiz del proyecto;
2. Cambiar el nombre de la segunda hoja para 'HojaParaActualizar'
3. En esta hoja, la cedula A1 tiene que llamarse 'CODIGO', y la cedula B1 'PRECIO'
4. En la columna A pegar todos los codigos de la hoja de productos, a partir de A2
5. En la columna B pegar los precios actualizados
6. Grabar el archivo.

TRAER LOS DATOS DE PRODUCTOS DE LA BASE DE DATOS, COMPARAR CON DEL PRECIO ACTUALIZADO Y CREAR ARCHIVO JSON ACTUALIZADO:

1. Ejecutar el CLI: 'createJson gc products' - para obtener los datos de la colección argumentada y crear el archivo json con nomber productsFirebaseJson.json;
2. Ejecutar el CLI: 'createJson up `<excelFilePath> <jsonFile>'` para comparar el archivo excel transformado en objeto con el archivo obtenido de Firestore 'productsFirebaseJson.json, y crear un nuevo archivo json llamado `<jsonFile>`;

   ENVIAR EL NUEVO ARCHIVO ACTUALIZADO A FIRESTORE:

3. En Firebase Firestore, cambiar la regla para escribir (write), para poder pisar los datos de la colección;
4. Ejecutar el CLI: 'createJson post `<collectionName> <jsonFile>`' - para enviar los datos del archivo jsonFilePath a la base de datos, en la colleción collectionName - NO HACER EL POST EN UNA COLLECIÓN EXISTENTE EJ.: 'PRODUCTS', ANTES DE PROBAR EN OTRA, EJ.: 'PRODUCTS2' QUE NO ESTAMOS USANDO;
5. Comparar en Firestore Products2 con Products para chequear si está todo bien;
6. Ejecutar el CLI: 'createJson post `products <jsonFile>`' - para enviar los datos del archivo jsonFilePath a la base de datos, en la colleción collectionName

<collectionName>
