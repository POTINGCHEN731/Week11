import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnO9kGupTo2BGqvCNu3ak1HBHz9ZL_CYE",
  authDomain: "week07-26177.firebaseapp.com",
  projectId: "week07-26177",
  storageBucket: "week07-26177.appspot.com",
  messagingSenderId: "887862320464",
  appId: "1:887862320464:web:ad23f31854484329a6e055"
};

const app = initializeApp(firebaseConfig)
// Initialize Firebase 
const db = getFirestore();

export default db
export { app }