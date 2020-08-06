import * as firebase from "firebase/app";
import * as firebaseui from 'firebaseui';
import "firebase/auth";
import "firebase/firestore";
import cookie from '@/utilities/Cookie';

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

const AuthProviderBtn = (callback) => {
  // Initialize the FirebaseUI widget using Firebase.
  if (cookie.getCookie('token') == null && cookie.getCookie('uid') == null && firebaseui.auth.AuthUI.getInstance() == null){
    const UIAuthProvider = new firebaseui.auth.AuthUI(firebase.auth());
    UIAuthProvider.start('#firebaseui-auth-container', {
      signInSuccessUrl: 'home',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      queryParameterForWidgetMode: 'mode',
      queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: ((authResult, redirectUrl) => {
          let token = authResult.credential.accessToken;
          let user = authResult.user;
          let isNewUser = authResult.additionalUserInfo.isNewUser;
          cookie.setCookie('token', token, 8);
          cookie.setCookie('uid', user.uid, 8);
          console.log('redirectUrl', redirectUrl);
          if (isNewUser) {
            callback.setData(user);
          }else{
            return true;
          }
        }),
        signInFailure: (error => {
          return handleUIError(error);
        }),
        uiShown: () => { }
      }
    });
  }
}

export { DB, Auth, GoogleAuthProvider, AuthProviderBtn}