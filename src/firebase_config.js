const dotenv = require('dotenv');
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'costofinal-b391b.firebaseapp.com',
  projectId: 'costofinal-b391b',
  storageBucket: 'costofinal-b391b.appspot.com',
  messagingSenderId: '75874645639',
  appId: '1:75874645639:web:56bd9d47fe6a0373b82a22',
  measurementId: 'G-JT7HWX4825',
};

module.exports = { firebaseConfig };
