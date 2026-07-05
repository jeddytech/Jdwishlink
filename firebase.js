import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVFWQF7P-9ZQT4kak1i_UICXlmNd1qeCE",
  authDomain: "jdwishlink.firebaseapp.com",
  projectId: "jdwishlink",
  storageBucket: "jdwishlink.firebasestorage.app",
  messagingSenderId: "364819369371",
  appId: "1:364819369371:web:a1162a4b62cf89f50c253e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  serverTimestamp
};
