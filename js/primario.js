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

async function seleccionar() {
  try {
    const tablaDatos = document.getElementById("tablaDatos");
    tablaDatos.innerHTML = ""; // Limpiar tabla antes de agregar datos nuevos

    const juegosSnapshot = await getDocs(collection(db, "YOUR_COLLECTION"));

    const tabla = document.createElement("table");
    tabla.innerHTML = `
      <tr>
        <th>Título</th>
        <th>Género</th>
        <th>Plataforma</th>
        <!-- Agrega más encabezados según tus necesidades -->
      </tr>
    `;

    juegosSnapshot.forEach((doc) => {
      const juego = doc.data();
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${juego.titulo}</td>
        <td>${juego.genero}</td>
        <td>${juego.plataforma}</td>
        <!-- Agrega más columnas según tus necesidades -->
      `;
      tabla.appendChild(fila);
    });

    tablaDatos.appendChild(tabla);
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    alert(
      "Error al obtener los juegos. Consulta la consola para más detalles."
    );
  }
}

document.addEventListener("DOMContentLoaded", seleccionar);
