import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZzqF4iwnck1eKEJ66H6NvE39NnWJXaWs",
  authDomain: "minnanfirebase-b374f.firebaseapp.com",
  databaseURL: "https://minnanfirebase-b374f.firebaseio.com",
  projectId: "minnanfirebase-b374f",
  storageBucket: "minnanfirebase-b374f.appspot.com",
  messagingSenderId: "180772038793",
  appId: "1:180772038793:web:609523046e6d884e99be58",
  measurementId: "G-KDLYN15FSH"
};
firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const Auth = firebase.auth();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { DB, Auth, GoogleAuthProvider}