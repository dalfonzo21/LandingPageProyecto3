// Importa las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {  getDatabase, ref, set, push, get} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

// Inicializar autenticación
const auth = getAuth(app);

// Iniciar sesión anónima automáticamente
signInAnonymously(auth)
  .then(() => {
    console.log("Usuario anónimo autenticado");
  })
  .catch((error) => {
    console.error("Error en autenticación anónima:", error);
  });

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