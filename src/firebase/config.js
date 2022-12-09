import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASkZbrxaQuYDM-G-MM-Ce59bGTYAL3KrI",
  authDomain: "mymoney-b4def.firebaseapp.com",
  projectId: "mymoney-b4def",
  storageBucket: "mymoney-b4def.appspot.com",
  messagingSenderId: "953645819347",
  appId: "1:953645819347:web:829129be8d7e681cd6bb26",
};

//init firebase app
firebase.initializeApp(firebaseConfig);

//init storage
const projectFirestore = firebase.firestore();

//init autentification
const projectAuth = firebase.auth();

//init timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
