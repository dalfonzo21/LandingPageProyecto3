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