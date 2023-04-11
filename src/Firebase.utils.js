// import firebase from "firebase";
// import dotenv from 'dotenv'
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// dotenv.config()

var firebaseConfig = {
    apiKey: "AIzaSyDofdnlbXgxhPja0PHR7ZF6DV482Uy8KXM",
    authDomain: "firetodo-db473.firebaseapp.com",
    projectId: "firetodo-db473",
    storageBucket: "firetodo-db473.appspot.com",
    messagingSenderId: "1078191052593",
    appId: "1:1078191052593:web:d2ed86401f268edae20210",
    measurementId: "G-N7CRHMP8W2"
  };
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// }
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()

  export { db ,firebase};
