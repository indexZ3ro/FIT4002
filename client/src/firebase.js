import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDqRkt4tKFwMOIv66HzpKgM__sAeCrH_bY',
  authDomain: 'project-5389016526708021196.firebaseapp.com',
  projectId: 'project-5389016526708021196',
  storageBucket: 'project-5389016526708021196.appspot.com',
  messagingSenderId: '99663445948',
  appId: '1:99663445948:web:011cdc11f5bf35277175b9',
  measurementId: 'G-R1ZS47V8MX'
}

const firebaseApp = initializeApp(firebaseConfig)
// Initialize firestore (we dont use currently)
// const db = getFirestore(firebaseApp)

// Initialize the Realtime Database
const realtimeDb = getDatabase(firebaseApp);

export {realtimeDb}
