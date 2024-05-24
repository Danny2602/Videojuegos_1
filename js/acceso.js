import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

import { auth } from "./app/firebase.js";
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

const googleButton = document.getElementById("googleLogin");
googleButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const credenciales = await signInWithPopup(auth, provider);
    consolo.log(credenciales);
  } catch (error) {
    console.log(error);
  }
});
