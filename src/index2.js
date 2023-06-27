const { createJsonFileFromObject } = require('./utils.js');
const { getProductsFromFirestore } = require('./firebase-utils.js');

const createAsyncJsonFromDB = async () => {
  const productsFromDB = await getProductsFromFirestore();
  console.log(productsFromDB);

  createJsonFileFromObject(productsFromDB.data);
};

module.exports = { createAsyncJsonFromDB };
