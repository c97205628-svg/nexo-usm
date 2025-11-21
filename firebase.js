// firebase.js — conexión central a Firebase (CDN v12.6.0)

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuración REAL de tu proyecto Firebase (CDN)
export const firebaseConfig = {
    apiKey: "AIzaSyDVCBVefpYbD4ozs_WNxqLBUyjnavZTFqg",
    authDomain: "nexousm-6214b.firebaseapp.com",
    projectId: "nexousm-6214b",
    storageBucket: "nexousm-6214b.firebasestorage.app",
    messagingSenderId: "418780269187",
    appId: "1:418780269187:web:df7a27481e44290c8d29b6",
    measurementId: "G-30TQCPBJ4K"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);
