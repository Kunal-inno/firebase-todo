// import firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyDofdnlbXgxhPja0PHR7ZF6DV482Uy8KXM",
    authDomain: "firetodo-db473.firebaseapp.com",
    projectId: "firetodo-db473",
    storageBucket: "firetodo-db473.appspot.com",
    messagingSenderId: "1078191052593",
    appId: "1:1078191052593:web:d2ed86401f268edae20210",
    measurementId: "G-N7CRHMP8W2"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()

  export { db ,firebase};
