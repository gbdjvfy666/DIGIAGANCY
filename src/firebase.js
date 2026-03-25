
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNEKGUghgrYmmpMtHvoBhECd524D5FULo",
  authDomain: "nsbh1-45565.firebaseapp.com",
  projectId: "nsbh1-45565",
  storageBucket: "nsbh1-45565.firebasestorage.app",
  messagingSenderId: "684598079166",
  appId: "1:684598079166:web:75a63d399af199eafeb8ef",
  measurementId: "G-FNC8Y49WEZ"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); 
export const db = getFirestore(app);

export default app;