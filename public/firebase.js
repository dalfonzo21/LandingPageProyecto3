// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {  getDatabase, ref, set, push, get} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
    apiKey: "AIzaSyBq6U64eSUVsThyufjdgVssuOWmCsVxDFk",
    authDomain: "landing-proy.firebaseapp.com",
    projectId: "landing-proy",
    storageBucket: "landing-proy.firebasestorage.app",
    messagingSenderId: "412055312577",
    appId: "1:412055312577:web:d28e4dfa7e4c03e43adc40",
    measurementId: "G-SK6960FJFN"
  };

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

async function existeCita(fecha, hora) {
  try {
    const citasRef = ref(database, 'citas');
    const snapshot = await get(citasRef);
    
    if (snapshot.exists()) {
      const citas = snapshot.val();
      // Buscar si existe una cita con la misma fecha y hora
      for (let id in citas) {
        if (citas[id].fecha === fecha && citas[id].hora === hora) {
          return true;
        }
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error verificando cita: " + error.message);
  }
}

async function guardarCita(cita) {
  try {
    const citasRef = ref(database, 'citas');
    const nuevaCitaRef = push(citasRef);
    await set(nuevaCitaRef, cita);
    return nuevaCitaRef.key;
  } catch (error) {
    throw new Error("Error guardando cita: " + error.message);
  }
}

export { existeCita, guardarCita, getDatabase, database };