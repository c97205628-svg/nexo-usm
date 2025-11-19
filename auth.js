/* -----------------------------------------
   CONFIGURACIÓN FIREBASE
------------------------------------------ */

const firebaseConfig = {
  apiKey: "AIzaSyDvCFVeYpDb4ozs_lNxqLBUyinavZTF4g",
  authDomain: "nexosum-6214b.firebaseapp.com",
  projectId: "nexosum-6214b",
  storageBucket: "nexosum-6214b.firebasestorage.app",
  messagingSenderId: "418780269187",
  appId: "1:418780269187:web:df7a27481e44290c8d29b6",
  measurementId: "G-3GTQCPBJ4K"
};

// Inicialización Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

/* -----------------------------------------
   REGISTRO DE USUARIO
------------------------------------------ */
function registrarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmar = document.getElementById("confirmar").value;

  if (password !== confirmar) {
    document.getElementById("msgError").style.display = "block";
    document.getElementById("msgError").innerText = "Las contraseñas no coinciden.";
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      
      // Guardar nombre en Firebase
      return userCredential.user.updateProfile({
        displayName: nombre
      });
    })
    .then(() => {
      alert("Registro exitoso ✔ Bienvenido/a");
      window.location.href = "login.html";
    })
    .catch((error) => {
      document.getElementById("msgError").style.display = "block";
      document.getElementById("msgError").innerText = error.message;
    });
}

/* -----------------------------------------
   LOGIN
------------------------------------------ */
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      alert("Inicio de sesión exitoso ✔");
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById("msgError").style.display = "block";
      document.getElementById("msgError").innerText = error.message;
    });
}

/* -----------------------------------------
   CERRAR SESIÓN
------------------------------------------ */
function cerrarSesion() {
  auth.signOut()
    .then(() => {
      alert("Sesión cerrada ✔");
      window.location.href = "index.html";
    });
}
