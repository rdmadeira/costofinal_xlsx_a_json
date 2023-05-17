// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const { firebaseConfig } = require('./firebase_config.js');
/* const products = require('../newProducts.json'); */
/* const ferreteria = require('../ferreteria.json'); */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sendAllProductsJsonToDB = async (json) => {
  Object.keys(json).forEach((key) => {
    setDoc(doc(db, 'products', key), json[key]);
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

module.exports = { sendOneSubProductsToDB, sendAllProductsJsonToDB };
