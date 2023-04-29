import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDqRkt4tKFwMOIv66HzpKgM__sAeCrH_bY",
  authDomain: "project-5389016526708021196.firebaseapp.com",
  projectId: "project-5389016526708021196",
  storageBucket: "project-5389016526708021196.appspot.com",
  messagingSenderId: "99663445948",
  appId: "1:99663445948:web:011cdc11f5bf35277175b9",
  measurementId: "G-R1ZS47V8MX"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export default db;