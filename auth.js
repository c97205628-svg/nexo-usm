// auth.js — manejo de inicio de sesión y protección de páginas

import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";


// ------------------------------------------------------
// 🚀 INICIAR SESIÓN
// ------------------------------------------------------
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        console.log("Usuario autenticado:", user.uid);

        const ref = doc(db, "users", user.uid);
        const userDoc = await getDoc(ref);

        if (!userDoc.exists()) {
            alert("Tu cuenta existe en Auth pero no tiene datos en Firestore.");
            return;
        }

        localStorage.setItem("userData", JSON.stringify({
            uid: user.uid,
            ...userDoc.data()
        }));

        window.location.href = "index.html";

    } catch (err) {
        console.error("Error login:", err);

        switch (err.code) {
            case "auth/invalid-email":
                alert("Correo inválido.");
                break;
            case "auth/user-not-found":
                alert("Este correo no existe en el sistema.");
                break;
            case "auth/wrong-password":
                alert("Contraseña incorrecta.");
                break;
            case "auth/invalid-api-key":
                alert("La API KEY es inválida. Revisa firebase.js");
                break;
            default:
                alert("Credenciales incorrectas o error de conexión.");
                break;
        }
    }
}



// ------------------------------------------------------
// 🚀 PROTEGER PÁGINAS
// ------------------------------------------------------
export function protegerPagina() {
    const usuario = localStorage.getItem("userData");
    if (!usuario) {
        window.location.href = "login.html";
    }
}



// ------------------------------------------------------
// 🚀 OBTENER UID DEL USUARIO
// ------------------------------------------------------
export function obtenerUID(callback) {
    const data = localStorage.getItem("userData");

    if (!data) {
        callback(null);
        return;
    }

    try {
        const json = JSON.parse(data);
        callback(json.uid);
    } catch (err) {
        console.error("Error al leer userData:", err);
        callback(null);
    }
}



// ------------------------------------------------------
// 🚀 CERRAR SESIÓN
// ------------------------------------------------------
export function cerrarSesion() {
    signOut(auth).then(() => {
        localStorage.removeItem("userData");
        window.location.href = "login.html";
    }).catch(err => {
        console.error("Error al cerrar sesión:", err);
    });
}
