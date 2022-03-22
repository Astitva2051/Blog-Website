// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJCrULAKquptE1rpT4T4FRBFCzI1shDZU",
  authDomain: "blog-website-35bdb.firebaseapp.com",
  projectId: "blog-website-35bdb",
  storageBucket: "blog-website-35bdb.appspot.com",
  messagingSenderId: "933263196977",
  appId: "1:933263196977:web:7764984fc3375480c16610",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
