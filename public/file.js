"use strict";
document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const service = document.getElementById('service').value;
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !phone || !service) {
        alert("Por favor completa al menos tu nombre, teléfono y el tratamiento de interés.");
        return;
      }

      const finalMessage = `¡Hola! soy ${name}, y me gustaría solicitar una cita para un tratamiento de ${service} en su clínica en la fecha ${date} a la hora ${time} de preferencia.
Mensaje adicional: ${message || 'Ninguno'}. ¡Quedo a la espera de su respuesta!`;

      const whatsappNumber = "593992593659"; 
      const encodedMessage = encodeURIComponent(finalMessage);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      alert("Te hemos redirigido a WhatsApp para completar tu cita.");
    });


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