// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

// Firestore Database
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVFWQF7P-9ZQT4kak1i_UICXlmNd1qeCE",
  authDomain: "jdwishlink.firebaseapp.com",
  projectId: "jdwishlink",
  storageBucket: "jdwishlink.firebasestorage.app",
  messagingSenderId: "364819369371",
  appId: "1:364819369371:web:a1162a4b62cf89f50c253e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export everything we'll use
export {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
};
