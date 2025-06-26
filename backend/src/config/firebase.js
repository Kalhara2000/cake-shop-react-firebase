//firebase.js

require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, serverTimestamp } = require('firebase/firestore');

 const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
 };


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Test connection
const testConnection = async () => {
  try {
    const testRef = doc(db, 'connections', 'test');
    await setDoc(testRef, {
      status: 'connected',
      timestamp: serverTimestamp()
    });
    console.log('✅ Firebase Firestore connected successfully!');
  } catch (error) {
    console.error('❌ Firebase connection failed:', error.message);
  }
};


module.exports = {
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  testConnection
};
