import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiQPAO8W8SoI_0JMrBeNPG59A9eMFtt0k",
  authDomain: "animal-crossing-group-2d1d4.firebaseapp.com",
  databaseURL: "https://animal-crossing-group-2d1d4.firebaseio.com",
  projectId: "animal-crossing-group-2d1d4",
  storageBucket: "animal-crossing-group-2d1d4.appspot.com",
  messagingSenderId: "421325207272",
  appId: "1:421325207272:web:7d1789f567f08e03713b5d",
  measurementId: "G-1ZFJZE3L3K"
};
firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const Auth = firebase.auth();
const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { DB, Auth, GoogleAuthProvider}