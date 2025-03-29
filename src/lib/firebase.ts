
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSaBbwbIXKxfJct7a6VzjmmV0hjrPuF90",
  authDomain: "iotronz.firebaseapp.com",
  databaseURL: "https://iotronz-default-rtdb.firebaseio.com",
  projectId: "iotronz",
  storageBucket: "iotronz.firebasestorage.app",
  messagingSenderId: "1071295393272",
  appId: "1:1071295393272:web:f12433dcd90d9e9d65ba0d",
  measurementId: "G-Y7BNV4SLXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

// Only initialize analytics in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
