import firebase from 'firebase';


const firebaseApp= firebase.initializeApp({
    apiKey: "AIzaSyBiTiOA5FCh8r6Vp7B2wAOPf8fnNqUkuho",
    authDomain: "mysalon-f2d46.firebaseapp.com",
    databaseURL: "https://mysalon-f2d46.firebaseio.com",
    projectId: "mysalon-f2d46",
    storageBucket: "mysalon-f2d46.appspot.com",
    messagingSenderId: "1011949426791",
    appId: "1:1011949426791:web:4e6f703e97ae92263f5cc2",
    measurementId: "G-39FQMDJRPK"

  });

const db= firebaseApp.firestore();
const auth= firebase.auth();

export {auth,db};


  
  
  


