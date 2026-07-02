document.addEventListener("DOMContentLoaded", () => {
    
    // CONTROL Y ANIMACIÓN DEL MENÚ HAMBURGUESA
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Función para abrir/cerrar el menú
    const toggleMenu = () => {
        hamburgerBtn.classList.toggle("active"); // Hace la animación a "X"
        navMenu.classList.toggle("open");         // Desplaza el menú hacia abajo
    };

    // Función para cerrar el menú limpiamente
    const closeMenu = () => {
        hamburgerBtn.classList.remove("active");
        navMenu.classList.remove("open");
    };

    // Evento al presionar el botón de las tres líneas
    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation(); 
        toggleMenu();
    });

    // Cerrar el menú al hacer clic en Inicio, Acerca de o Contacto
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // Cerrar el menú si el usuario hace clic en cualquier otra parte de la pantalla
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // CAMBIO DE ESTILO EN EL HEADER AL HACER SCROLL
    const header = document.querySelector("header");
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.background = "rgba(0, 47, 129, 0.95)"; // Azul sólido al bajar
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
            header.style.transition = "all 0.4s ease";
        } else {
            header.style.background = "linear-gradient(90deg, rgb(101, 186, 191, 0.5) 0%, rgba(71, 104, 145, 0.719) 50%,  rgb(0, 47, 129) 100%)"; // Gradiente original
            header.style.boxShadow = "none";
        }
    });
});