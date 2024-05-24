import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
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
document.addEventListener("DOMContentLoaded", (event) => {
  // Obtener el nombre del usuario del almacenamiento local
  const userName = localStorage.getItem("userName");
  // if si el usuario inicio la secion
  if (userName == null) {
    document.getElementById("usuario").textContent = "Ingrese el usuario";
    const botonesAccion = document.querySelectorAll(".btn-accion");

    botonesAccion.forEach((boton) => (boton.style.display = "none"));
  } else {
    document.getElementById("usuario").textContent = userName;
    window.onload = function () {
      fetch("nav.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("nav-container").innerHTML = data;
        });
      fetch("pie.html")
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("pie-container").innerHTML = data;
        });
    };
  }

  // Agregar evento de clic al botón de cerrar sesión
  document.getElementById("cerrar").addEventListener("click", () => {
    auth
      .signOut()
      .then(() => {
        // Limpiar el almacenamiento local
        localStorage.removeItem("userName");
        // Redirigir al usuario a la página de inicio de sesión
        window.location.assign("index.html");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  });
});
