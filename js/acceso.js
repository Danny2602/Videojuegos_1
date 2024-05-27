import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcLSqqTsRbDzkf4vj6UqWOGn9HwGnUGmc",
  authDomain: "videojuegos-41fdf.firebaseapp.com",
  projectId: "videojuegos-41fdf",
  storageBucket: "videojuegos-41fdf.appspot.com",
  messagingSenderId: "659894331726",
  appId: "1:659894331726:web:a296087e85a6856894561f",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleButton = document.getElementById("googleLogin");
googleButton.addEventListener("click", async (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    const credenciales = await signInWithPopup(auth, provider);
    localStorage.setItem("userName", credenciales.user.displayName);
    window.location.assign("inicio.html");
    console.log(credenciales);
  } catch (error) {
    console.log(error);
    alert("error");
  }
});
document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("passwordInput").value; // Asegúrate de tener el ID correcto

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    localStorage.setItem("userName", userCredential.user.displayName);
    window.location.assign("inicio.html");
    console.log(userCredential);
  } catch (error) {
    console.log(error);
    alert("Error al iniciar sesión: " + error.message);
  }
});

//registrarse con el usario y la contraseña
document.getElementById("registrarBtn").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.getElementById("correo").value;
  const password = document.getElementById("contraseña").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);

    $("#registroModal").modal("hide"); // Si estás usando jQuery para Bootstrap
  } catch (error) {
    console.error(error);
    alert("Error al registrar el usuario: " + error.message);
  }
});
