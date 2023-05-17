// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { doc, setDoc } = require('firebase/firestore');
const products = require('../newProducts.json');

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCgh-bcnxPvdlayp5bD1du8wH1ZzK_49bc',
  authDomain: 'costofinal-b391b.firebaseapp.com',
  projectId: 'costofinal-b391b',
  storageBucket: 'costofinal-b391b.appspot.com',
  messagingSenderId: '75874645639',
  appId: '1:75874645639:web:56bd9d47fe6a0373b82a22',
  measurementId: 'G-JT7HWX4825',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sendJsonToDB = async (json) => {
  Object.keys(json).forEach((key) => {
    setDoc(doc(db, 'products', key), json[key]);
  });
};

sendJsonToDB(products).then(() => console.log('Sent to DB'));
