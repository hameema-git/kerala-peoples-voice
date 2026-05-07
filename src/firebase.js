import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2WUtevlw2uc0Mh0NyPKrtYeYAKu2F45U",
  authDomain: "kerala-cm-voice.firebaseapp.com",
  databaseURL: "https://kerala-cm-voice-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kerala-cm-voice",
  storageBucket: "kerala-cm-voice.firebasestorage.app",
  messagingSenderId: "327735179236",
  appId: "1:327735179236:web:556eb12e963029415639f1",
  measurementId: "G-M8PHY62497"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);