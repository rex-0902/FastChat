import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA90l7B3UF92phhS5j12zfK2zyj8tWddWE",
  authDomain: "fastchat-2572f.firebaseapp.com",
  projectId: "fastchat-2572f",
  storageBucket: "fastchat-2572f.appspot.com",
  messagingSenderId: "850095673053",
  appId: "1:850095673053:web:665564a06a6b15d6529534",
  measurementId: "G-TYR8X0XDR6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { db };
