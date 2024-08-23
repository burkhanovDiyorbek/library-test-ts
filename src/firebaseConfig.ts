// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA10rppnAnVB5J5gTdOvC4MGQseAgLq8g8",
  authDomain: "uploadingfile-7777b.firebaseapp.com",
  projectId: "uploadingfile-7777b",
  storageBucket: "uploadingfile-7777b.appspot.com",
  messagingSenderId: "498401422510",
  appId: "1:498401422510:web:1778baaac6e4399663913f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
