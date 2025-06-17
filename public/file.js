"use strict";
import { existeCita, guardarCita} from './firebase.js';

    document.addEventListener('DOMContentLoaded', () => {
  // Selecciona todos los botones de reserva
  const botones = document.querySelectorAll('.reservar-btn');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      // Obtiene el servicio desde el atributo data-servicio
      const servicio = boton.getAttribute('data-servicio');

      // Selecciona el <select> del formulario
      const select = document.getElementById('service');

      // Asigna el valor seleccionado
      select.value = servicio;

      // Hace scroll hacia el formulario
      document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// Validar que la fecha sea sábado (6) o domingo (0)
document.addEventListener('DOMContentLoaded', () => {
  const fechaInput = document.getElementById('date');
  const mensajeError = document.getElementById('mensaje-error');

  fechaInput.addEventListener('change', () => {
    const fechaSeleccionada = new Date(fechaInput.value);
    const diaSemana = fechaSeleccionada.getUTCDay(); // Domingo = 0, Sábado = 6

    if (diaSemana !== 0 && diaSemana !== 6) {
      // Día inválido, se borra
      fechaInput.value = '';
      mensajeError.classList.remove('hidden');
    } else {
      // Día válido
      mensajeError.classList.add('hidden');
    }
  });
});



const form = document.getElementById('contactForm');
const estado = document.getElementById('estadoCita');
const whatsappBtn = document.getElementById('whatsappBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const cita = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    service: formData.get('service'),
    fecha: formData.get('date'),
    hora: formData.get('time'),
    message: formData.get('message')
  };

  if (!cita.fecha || !cita.hora) {
    estado.textContent = "Por favor, selecciona fecha y hora.";
    whatsappBtn.classList.add('hidden');
    return;
  }

  try {
    const yaExiste = await existeCita(cita.fecha, cita.hora);
    if (yaExiste) {
      estado.textContent = "El horario seleccionado ya está ocupado. Por favor elige otro.";
      whatsappBtn.classList.add('hidden');
      return;
    }

    const id = await guardarCita(cita);
    estado.textContent = "¡Cita agendada con éxito!";

    const mensajeWhats = encodeURIComponent(
      `Hola, quiero confirmar mi cita:\nNombre: ${cita.name}\nFecha: ${cita.fecha}\nHora: ${cita.hora}\nServicio: ${cita.service}`
    );
    whatsappBtn.href = `https://wa.me/593992593659?text=${mensajeWhats}`;
    whatsappBtn.classList.remove('hidden');

    form.reset();
  } catch (error) {
    estado.textContent = "Error al agendar la cita: " + error.message;
    whatsappBtn.classList.add('hidden');
  }
});
