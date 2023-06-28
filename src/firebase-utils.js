const { firebaseConfig } = require('./firebase_config.js');
const { initializeApp } = require('firebase/app');
const {
  getDocs,
  collection,
  getFirestore,
  setDoc,
  doc,
} = require('firebase/firestore');

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getProductsFromFirestore = async (collectionName) => {
  try {
    const productsArray = await getDocs(collection(db, collectionName));
    const products = {};
    productsArray.forEach((doc) => (products[doc.id] = doc.data()));

    return {
      data: products,
      message: 'Succesfully Products Request',
      isSuccess: true,
    };
  } catch (error) {
    console.log('error', error);

    return {
      error: new Error('Internal Server Error'),
      message: 'Error en el servidor',
      isSuccess: false,
    };
  }
};

const sendAllProductsJsonToDB = async (collectionName, jsonFile) => {
  Object.keys(jsonFile).forEach((key) => {
    setDoc(doc(db, collectionName, key), jsonFile[key]);
  });
};

/* sendAllProductsJsonToDB(products).then(() => console.log('Sent to DB')); */

const sendOneSubProductsToDB = async (subProdJson, subProdName) => {
  console.log(subProdJson, subProdName);
  setDoc(doc(db, 'products2', subProdName), subProdJson);
};

/* sendOneSubProductsToDB(ferreteria, 'FERRETERIA')
  .then(() => console.log('Ejecutado'))
  .catch((err) => console.log(err)); */

module.exports = {
  sendOneSubProductsToDB,
  sendAllProductsJsonToDB,
  getProductsFromFirestore,
};
