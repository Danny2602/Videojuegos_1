import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", anadir);
document.addEventListener("DOMContentLoaded", mostrarDatos);
document.addEventListener("DOMContentLoaded", actualizar);

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
        categoria: vidproduct.categorias.value,
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

function actualizar() {
  event.preventDefault();
  console.log("inicio");
  const updateGameForm = document.getElementById("updateGameForm");

  updateGameForm.addEventListener("submit", function (e) {
    e.preventDefault();

    try {
      const juegoID = updateGameForm.getAttribute("data-id");
      const juegoRef = doc(db, "Juegos", juegoID);

      updateDoc(juegoRef, {
        titulo: updateGameForm.updateTitulo.value,
        genero: updateGameForm.updateGenero.value,
        plataforma: updateGameForm.updatePlataforma.value,
        fecha: updateGameForm.updateFecha_lanzamiento.value,
        desarrollador: updateGameForm.updateDesarrollador.value,
        editor: updateGameForm.updateEditor.value,
        clasificacion: updateGameForm.updateClasificacion.value,
        categoria: updateGameForm.updateCategorias.value,
        precio: updateGameForm.updatePrecio.value,
        descripcion: updateGameForm.updateDescripcion.value,
      })
        .then(() => {
          alert("El juego ha sido actualizado correctamente.");
          mostrarDatos();
        })
        .catch((error) => {
          console.error("Error al actualizar el juego:", error);
          alert(
            "Error al actualizar el juego. Consulta la consola para más detalles."
          );
        });
    } catch (error) {
      console.error("Error al actualizar el juego:", error);
      alert(
        "Error al actualizar el juego. Consulta la consola para más detalles."
      );
    }
  });
}

async function mostrarDatos() {
  try {
    const datos = document.getElementById("datos");
    datos.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Juegos"));

    querySnapshot.forEach((doc) => {
      const juego = doc.data(); // Obtener los datos del juego
      const juegoID = doc.id; // Obtener el ID del documento

      // Crear el elemento del boton actualizar
      const button = document.createElement("button");

      button.type = "button";
      button.className = "boton1";
      button.dataset.bsToggle = "modal";
      button.dataset.bsTarget = "#updateGameModal";
      button.textContent = "Actualizar";

      button.onclick = function () {
        mostrar(juegoID);
      };
      // crear el boton de eliminar
      const button2 = document.createElement("button");
      button2.type = "submit";

      button2.className = "boton2";

      button2.textContent = "Eliminar";
      button2.onclick = function () {
        eliminar(juegoID);
      };

      // Crear el elemento div que contendrá la información del juego y el botón
      const juegoDiv = document.createElement("div");
      juegoDiv.className = "card card-body  border-primary mt-0 ";
      juegoDiv.style.backgroundColor = "#363f4f";
      juegoDiv.style.color = "white";
      juegoDiv.style.border = "none";

      // Agregar el contenido del juego al div
      juegoDiv.innerHTML = `
        <h3 style="text-align:center;justify-content:center;display:flex;font-size:2.9vh;margin-bottom:3.5vh;font-weight: bold;">${juego.titulo}</h3>
        <div style="font-size:2.1vh;display:flex; "> 
          <div> 
            <p>Género: ${juego.genero}
            <br>Plataforma: ${juego.plataforma}<br>
            Fecha: ${juego.fecha}<br>
            Desarrollador: ${juego.desarrollador}<br>
            Categoria: ${juego.categoria}</p>
          </div>
          <div style="padding-left:8vh"> 
            <p>Editor: ${juego.editor}<br>
            Clasificación: ${juego.clasificacion}<br>
            Precio: ${juego.precio}<br>
            Descripción: ${juego.descripcion}</p> 
          </div>
          
        </div>
      `;

      const userName = localStorage.getItem("userName");

      if (userName == null) {
      } else {
        juegoDiv.appendChild(button);
        juegoDiv.appendChild(button2);

        // Agregar el div al contenedor de datos
        datos.appendChild(juegoDiv);
      }
      // Agregar el boton de actualizar y eliminar
    });
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    alert("Error al obtener los datos. Consulta la consola para más detalles.");
  }
}

async function mostrar(juegoID) {
  try {
    const juegoRef = doc(db, "Juegos", juegoID); // Construir la referencia del documento
    const juegoSnap = await getDoc(juegoRef); // Obtener los datos del documento

    if (juegoSnap.exists()) {
      const juego = juegoSnap.data();
      const updateGameForm = document.getElementById("updateGameForm");

      // Llenar el formulario con los datos del juego
      document.getElementById("updateTitulo").value = juego.titulo || "";
      document.getElementById("updateGenero").value = juego.genero || "";
      document.getElementById("updatePlataforma").value =
        juego.plataforma || "";
      document.getElementById("updateFecha_lanzamiento").value =
        juego.fecha || "";
      document.getElementById("updateDesarrollador").value =
        juego.desarrollador || "";
      document.getElementById("updateEditor").value = juego.editor || "";
      document.getElementById("updateClasificacion").value =
        juego.clasificacion || "";
      document.getElementById("updateCategorias").value = juego.categoria || "";
      document.getElementById("updatePrecio").value = juego.precio || "";
      document.getElementById("updateDescripcion").value =
        juego.descripcion || "";

      // Guardar el ID del juego en un atributo del formulario para usarlo al actualizar
      updateGameForm.setAttribute("data-id", juegoID);
    } else {
      console.error("No se encontró el juego con el ID proporcionado.");
    }
  } catch (error) {
    console.error("Error al obtener los datos del juego:", error);
  }
}

async function eliminar(juegoID) {
  try {
    const confirmacion = confirm("¿Seguro que deseas eliminar este juego?");

    if (confirmacion) {
      const juegoRef = doc(db, "Juegos", juegoID);
      await deleteDoc(juegoRef);
      alert("El juego ha sido eliminado correctamente.");
      mostrarDatos();
    } else {
      alert("La eliminación ha sido cancelada.");
    }
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
    alert("Error al eliminar el juego. Consulta la consola para más detalles.");
  }
}
