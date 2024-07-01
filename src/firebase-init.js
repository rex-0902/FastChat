import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeA8muiYjy0MAI7u1HrdnqYGdKMAx9WAg",
  authDomain: "fastchat-82244.firebaseapp.com",
  projectId: "fastchat-82244",
  storageBucket: "fastchat-82244.appspot.com",
  messagingSenderId: "1016118270997",
  appId: "1:1016118270997:web:c97de43f0d0f6e4934c21c"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
export { db };
