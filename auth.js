/* -----------------------------------------
   CONFIGURACIÓN FIREBASE
------------------------------------------ */

// Pegas aquí tu config real de Firebase:
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXX",
};

// Inicialización
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* -----------------------------------------
   REGISTRO DE USUARIO
------------------------------------------ */
function registrarUsuario() {
  const email = document.getElementById("emailRegistro").value;
  const password = document.getElementById("passwordRegistro").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Registro exitoso ✔ Bienvenido/a");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

/* -----------------------------------------
   LOGIN
------------------------------------------ */
function iniciarSesion() {
  const email = document.getElementById("emailLogin").value;
  const password = document.getElementById("passwordLogin").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Inicio de sesión exitoso ✔");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

/* -----------------------------------------
   CERRAR SESIÓN
------------------------------------------ */
function cerrarSesion() {
  auth.signOut().then(() => {
    alert("Sesión cerrada ✔");
    window.location.href = "index.html";
  });
}
