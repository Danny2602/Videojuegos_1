// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
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
      mostrarDatos();
      vidproduct.reset();
    } catch (error) {
      console.error("Error al añadir el documento: ", error);
      alert("Error al añadir el juego: " + error.message);
    }
  });
}

document.addEventListener("DOMContentLoaded", anadir);

async function mostrarDatos() {
  try {
    const datos = document.getElementById("datos");
    datos.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Juegos"));

    querySnapshot.forEach((doc) => {
      const juego = doc.data(); // Obtener los datos del juego
      const juegoID = doc.id; // Obtener el ID del documento

      datos.innerHTML += `
        <div class="card card-body  border-primary mt-0 col-4 " style="background-color: #363f4f;color:white; border: none;">
          <h3 style="text-align:center;justify-content:center;display:flex">${
            juego.titulo
          }</h3>
          <div class="" style="font-size:2.1vh;display:flex; justify-content: space-between;"> 
            <div> 
              <p>Género: ${juego.genero}</p>
              <p>Plataforma: ${juego.plataforma}</p>
              <p>Fecha: ${juego.fecha}</p>
              <p>Desarrollador: ${juego.desarrollador}</p>
            </div>
            <div> 
              <p>Editor: ${juego.editor}</p>
              <p>Clasificación: ${juego.clasificacion}</p>
              <p>Precio: ${juego.precio}</p>
              <p>Descripción: ${juego.descripcion}</p> 
            </div>
          </div>
          <!-- Botón para abrir el modal de actualizar -->
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#updateGameModal"
            onclick='mostrar(${JSON.stringify({ ...juego, id: juegoID })})'
          >
            Actualizar Juego
          </button>
        </div>
      `;
      console.log(juegoID);
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("Error al obtener los datos. Consulta la consola para más detalles.");
  }
}

async function mostrar(juegoID) {
  try {
    const juegoRef = db.collection("Juegos").doc(juegoID);
    const juegoSnap = await juegoRef.get();

    if (juegoSnap.exists) {
      const juego = juegoSnap.data();
      const updateGameForm = document.getElementById("updateGameForm");

      // Llenar el formulario con los datos del juego
      document.getElementById("updateTitulo").value = juego.titulo || "";
      document.getElementById("updateCategoria").value = juego.categoria || "";

      // Guardar el ID del juego en un atributo del formulario para usarlo al actualizar
      updateGameForm.setAttribute("data-id", juegoID);
    } else {
      console.error("No se encontró el juego con el ID proporcionado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del juego:", error);
  }
}
document.addEventListener("DOMContentLoaded", mostrarDatos);
