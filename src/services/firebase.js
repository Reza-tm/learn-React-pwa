import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1pOcLISuK4d5yO631BJZE3GCjxsf8qD0",
  authDomain: "react-pwa-350e2.firebaseapp.com",
  databaseURL: "https://react-pwa-350e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-pwa-350e2",
  storageBucket: "react-pwa-350e2.appspot.com",
  messagingSenderId: "650687404293",
  appId: "1:650687404293:web:006d861ef04a6926477f6c",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
