// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la referencia a la base de datos en tiempo real
const database = getDatabase(app);

const form = document.getElementById("contactForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = form.name.value;
    const telefono = form.phone.value;
    const correo = form.email.value;
    const tratamiento = form.service.value;
    const fecha = form.date.value;
    const hora = form.time.value;
    const mensaje = form.message.value;

    if (!fecha || !hora) {
      alert("Debes seleccionar fecha y hora");
      return;
    }

    // Verificar si ya existe una cita en la misma fecha y hora
    const citasRef = collection(db, "citas");
    const q = query(citasRef, where("fecha", "==", fecha), where("hora", "==", hora));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      alert("Lo sentimos, ya hay una cita agendada para esa fecha y hora.");
      return;
    }

    // Guardar la cita
    try {
      await addDoc(citasRef, {
        nombre,
        telefono,
        correo,
        tratamiento,
        fecha,
        hora,
        mensaje
      });
      alert("¡Tu cita ha sido agendada con éxito!");
      form.reset();
    } catch (error) {
      console.error("Error al guardar la cita:", error);
      alert("Ocurrió un error al agendar tu cita. Intenta nuevamente.");
    }
  });

export { app, database };