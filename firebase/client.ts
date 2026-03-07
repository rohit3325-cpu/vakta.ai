// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps} from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjQ2PTvTI9XgLf-Za9Y-es4rh-PIpPPsk",
  authDomain: "vakta-ai-9cffc.firebaseapp.com",
  projectId: "vakta-ai-9cffc",
  storageBucket: "vakta-ai-9cffc.firebasestorage.app",
  messagingSenderId: "184735971943",
  appId: "1:184735971943:web:480645f767e38eea0bb2c2",
  measurementId: "G-JXHQ8RH7WY"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth=getAuth(app);
export const db=getFirestore(app);