import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgaMd8ylKbnsGqVgp9tqraszh0J2W6nao",
  authDomain: "whatsapp-clone2-391313.firebaseapp.com",
  projectId: "whatsapp-clone2-391313",
  storageBucket: "whatsapp-clone2-391313.appspot.com",
  messagingSenderId: "216963174739",
  appId: "1:216963174739:web:6cf89651c14dcf93de11a6",
  measurementId: "G-PQQ23LB67E",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { db };
