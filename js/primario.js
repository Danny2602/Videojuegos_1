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

function anadir() {
  const vidproduct = document.getElementById("anadirVid");
  vidproduct.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "Juegos"), {
        titulo: vidproduct.titulo.value,
        genero: vidproduct.genero.value,
        plataforma: vidproduct.plataforma.value,
        fecha: vidproduct.fecha.value,
        desarrollador: vidproduct.desarrollador.value,
        editor: vidproduct.editor.value,
        clasificacion: vidproduct.clasificacion.value,
        precio: vidproduct.precio.value,
        descripcion: vidproduct.descripcion.value,
      });
      alert("Juego añadido con éxito");
      vidproduct.reset();
    } catch (error) {
      console.error("Error al añadir el documento: ", error);
      alert("Error al añadir el juego: " + error.message);
    }
  });
}
document.addEventListener("DOMContentLoaded", anadir);

const getTasks = () => db.collection("Juegos").get();

window.addEventListener("DOMContentLoaded", async (e) => {
  const querySnapshot = await getTasks();
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    taskContainer.innerHTML += `
    <div class="card card-body mt-0 border-primary"
    <h3>${doc.data().title}</h3>
    </div>
    `;
  });
});
