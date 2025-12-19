// Referencias a los elementos del DOM
const form         = document.getElementById("formRegistro");
const inputNombre  = document.getElementById("nombre");
const inputCorreo  = document.getElementById("correo");
const inputEdad    = document.getElementById("edad");
const mensajes     = document.getElementById("mensajes");
const menuBtn      = document.getElementById("menuBtn");
const eventMenu    = document.getElementById("eventMenu");
const eventDetails = document.getElementById("eventDetails");

// Datos de eventos ficticios para Navidad 2025
const navidadEvents = [
    { id: 1, name: "Cena de Nochebuena 2025", date: "24 de Diciembre, 20:00", loc: "Gran Salón Central", desc: "Disfruta de una cena gourmet con música en vivo." },
    { id: 2, name: "Intercambio de Regalos", date: "25 de Diciembre, 10:00", loc: "Área de Recreación", desc: "Trae un regalo y participa en el intercambio masivo." },
    { id: 3, name: "Taller de Duendes", date: "20-23 de Diciembre, 15:00", loc: "Sala de Manualidades", desc: "Aprende a hacer decoraciones navideñas únicas." },
    { id: 4, name: "Concierto de Villancicos", date: "22 de Diciembre, 18:00", loc: "Auditorio Principal", desc: "Las mejores voces interpretando clásicos navideños." },
    { id: 5, name: "Fiesta de Fin de Año", date: "31 de Diciembre, 22:00", loc: "Terraza Panorámica", desc: "Recibe el 2026 con fuegos artificiales y baile." }
];
 
// Patrones de validación
const patronNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/;
const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para poblar el menú
function populateMenu() {
    eventMenu.innerHTML = "";
    navidadEvents.forEach(event => {
        const item = document.createElement("div");
        item.className = "event-item";
        item.textContent = event.name;
        item.onclick = () => showEventDetails(event);
        eventMenu.appendChild(item);
    });
}

// Función para mostrar detalles
function showEventDetails(event) {
    eventDetails.innerHTML = `
        <strong>Evento:</strong> ${event.name}<br>
        <strong>Fecha:</strong> ${event.date}<br>
        <strong>Lugar:</strong> ${event.loc}<br>
        <strong>Descripción:</strong> ${event.desc}
    `;
    eventDetails.classList.remove("hidden");
    eventMenu.classList.add("hidden"); // Ocultar menú tras selección
}

// Toggle del menú
menuBtn.addEventListener("click", () => {
    eventMenu.classList.toggle("hidden");
    if (!eventMenu.classList.contains("hidden") && eventMenu.children.length === 0) {
        populateMenu();
    }
});

// Cerrar menú si se hace clic fuera (opcional para UX)
document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !eventMenu.contains(e.target)) {
        eventMenu.classList.add("hidden");
    }
});
 
// Función para mostrar mensajes en el área designada
function mostrarMensaje(texto, tipo) {
    mensajes.textContent = texto;   // Escribe el texto
 
    // Limpia clases anteriores y agrega la nueva
    mensajes.className = "";
    if (tipo === "error") {
        mensajes.classList.add("error");
    } else if (tipo === "ok") {
        mensajes.classList.add("ok");
    }
}
 
// Función principal de validación
function validarFormulario(evento) {
    // Evita que el formulario se envíe automáticamente
    evento.preventDefault();
 
    // Obtiene y limpia los valores
    const nombre  = inputNombre.value.trim();
    const correo  = inputCorreo.value.trim();
    const edadStr = inputEdad.value.trim();
    const edad    = Number(edadStr);
 
    // 1) Verificar que los campos no estén vacíos
    if (!nombre || !correo || !edadStr) {
        mostrarMensaje("Todos los campos son obligatorios.", "error");
        return;
    }
 
    // 2) Validar que el nombre solo tenga letras y espacios
    if (!patronNombre.test(nombre)) {
        mostrarMensaje("El nombre solo puede contener letras y espacios.", "error");
        return;
    }
 
    // 3) Validar formato de correo
    if (!patronCorreo.test(correo)) {
        mostrarMensaje("Ingresa un correo electrónico válido.", "error");
        return;
    }
 
    // 4) Verificar que la edad sea un número mayor o igual a 18
    if (Number.isNaN(edad) || edad < 18) {
        mostrarMensaje("La edad debe ser un número mayor o igual a 18.", "error");
        return;
    }
 
    // Si todo está correcto
    mostrarMensaje("Registro completado correctamente.", "ok");
    // form.reset(); // Descomenta si quieres limpiar el formulario
}
 
// Asocia la función al evento submit del formulario
form.addEventListener("submit", validarFormulario);