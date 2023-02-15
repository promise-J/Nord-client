// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import 'firebase/firestore';

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import {getAuth, getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {} from 'react-native-dotenv'




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD80ZdGqgyGJTMI3mqv7i_OuqXPIbOHqNw",
  authDomain: "nord-simple-app.firebaseapp.com",
  projectId: "nord-simple-app",
  storageBucket: "nord-simple-app.appspot.com",
  messagingSenderId: "317999005001",
  appId: "1:317999005001:web:72d5d66b328b6ab23aee98"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
// const db = firebase.firestore();
// const storage = firebase.storage();

let app =  firebase.initializeApp(firebaseConfig)

// const app = firebase.initializeApp(firebaseConfig);
// const auth = initializeAuth(firebas, {persistence: getReactNativePersistence(AsyncStorage)})

export { firebase, app}

// Initialize Firebase
