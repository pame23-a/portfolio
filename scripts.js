const roles = ["UX/UI Designer", "Fullstack Developer"];
let roleIndex = 0;
let charIndex = 0;
let currentRole = '';
const roleElement = document.getElementById("dynamic-role");
let deleting = false;
const typingSpeed = 150; // Velocidad de tipeo
const deletingSpeed = 100; // Velocidad de borrado
const delayBetweenRoles = 2000; // Pausa entre roles

// Asegúrate de que haya siempre un espacio para el texto para evitar que el contenedor cambie de tamaño
roleElement.style.minWidth = "15ch"; // Ajusta el ancho según el texto más largo

function typeRole() {
    // Obtener el texto actual
    currentRole = roles[roleIndex];

    // Si no está borrando, seguir escribiendo
    if (!deleting) {
        roleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor"></span>';
        charIndex++;
        if (charIndex > currentRole.length) {
            // Si ya terminó de escribir el texto completo, pausar un momento y empezar a borrar
            deleting = true;
            setTimeout(typeRole, delayBetweenRoles);
        } else {
            setTimeout(typeRole, typingSpeed);
        }
    }
    // Si está borrando, borrar el texto letra por letra
    else {
        roleElement.innerHTML = currentRole.substring(0, charIndex) + '<span class="cursor"></span>';
        charIndex--;
        if (charIndex < 0) {
            // Cuando haya borrado todo el texto, cambiar al siguiente rol
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, typingSpeed);
        } else {
            setTimeout(typeRole, deletingSpeed);
        }
    }
}

// Iniciar el efecto de tipeo cuando la página se cargue
window.onload = typeRole;

// CV EN BOTON
function viewResume() {
  // Cambia 'resume.pdf' por el enlace real a tu currículum
  window.open('resume.pdf', '_blank');
}


// imagen de proyectos
document.addEventListener('DOMContentLoaded', () => {
  const tiltElements = document.querySelectorAll('.js-tilt'); // Selecciona todos los elementos con la clase .js-tilt

  if (tiltElements.length === 0) {
    console.error("No se encontraron elementos con la clase .js-tilt");
    return; // Si no hay elementos, detiene el código
  }

  tiltElements.forEach((tiltElement) => {
    tiltElement.addEventListener('mousemove', (event) => {
      const { offsetWidth: width, offsetHeight: height } = tiltElement;
      const { offsetX, offsetY } = event;

      const x = (offsetX / width) * 100;
      const y = (offsetY / height) * 100;

      // Aplica la transformación 3D
      tiltElement.style.transform = `perspective(1000px) rotateX(${(y - 50) / 10}deg) rotateY(${(50 - x) / 10}deg)`;
    });

    tiltElement.addEventListener('mouseleave', () => {
      // Regresa a la posición original al salir el mouse
      tiltElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
});


document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a"); // Selecciona enlaces dentro de nav-links

  let currentSectionId = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Ajuste para el desplazamiento
    const sectionHeight = section.offsetHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active"); // Elimina la clase activa de todos los enlaces
    if (link.getAttribute("href") === `#${currentSectionId}`) {
      link.classList.add("active"); // Añade la clase activa solo al enlace correspondiente
    }
  });
});
