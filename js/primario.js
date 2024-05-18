// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcLSqqTsRbDzkf4vj6UqWOGn9HwGnUGmc",
  authDomain: "videojuegos-41fdf.firebaseapp.com",
  projectId: "videojuegos-41fdf",
  storageBucket: "videojuegos-41fdf.appspot.com",
  messagingSenderId: "659894331726",
  appId: "1:659894331726:web:a296087e85a6856894561f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function añadir() {
  const vidproduct = document.getElementById("añadirVid");
  vidproduct.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "Juegos"), {
      Titulo: vidproduct.titulo.value,
      Genero: vidproduct.genero.value,
      Plataforma: vidproduct.plataforma.value,
      Fecha: vidproduct.fecha.value,
      Desarrollador: vidproduct.desarrollador.value,
      Editor: vidproduct.editor.value,
      Clasificacion: vidproduct.clasificacion.value,
      Precio: vidproduct.precio.value,
      descripcion: vidproduct.descripcion.value,
    });
    vidproduct.reset();
  });
}
