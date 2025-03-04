// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDwJwN4QovaI94e7I_Dyv70QIa7kqtVhAk",
    authDomain: "tareas-a7650.firebaseapp.com",
    projectId: "tareas-a7650",
    storageBucket: "tareas-a7650.firebasestorage.app",
    messagingSenderId: "524559217572",
    appId: "1:524559217572:web:94e8c7e2919fa8bf7d8731"
  };

// Initialize Firebase
const db = initializeApp(firebaseConfig);

export {db}