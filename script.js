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

const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const buttons = Array.from(document.querySelectorAll('.menu-dot'));

const updateCarousel = (targetIndex) => {
    if (slides.length === 0) return;

    // 1. Mover el track para centrar el elemento seleccionado
    const firstSlide = slides[0];
    
    // CAMBIO CLAVE: offsetWidth lee el ancho de la caja sin importar el transform: scale() de CSS
    const slideWidth = firstSlide.offsetWidth;
    const containerWidth = document.querySelector('.carousel-container').getBoundingClientRect().width;
    
    // Extrae dinámicamente los márgenes calculados por el navegador en píxeles exactos
    const computedStyles = window.getComputedStyle(firstSlide);
    const marginLeft = parseFloat(computedStyles.marginLeft);
    const marginRight = parseFloat(computedStyles.marginRight);
    
    // Suma real inmune a las alteraciones visuales de escala
    const slideTotalWidth = slideWidth + marginLeft + marginRight;
    
    // Fórmula matemática para posicionar el eje central de forma perfecta
    const amountToMove = -(targetIndex * slideTotalWidth) + (containerWidth / 2) - (slideTotalWidth / 2);
    
    track.style.transform = `translateX(${amountToMove}px)`;

    // 2. Actualizar las clases visuales de los Slides
    slides.forEach((slide, index) => {
        if (index === targetIndex) {
            slide.classList.add('active-slide');
        } else {
            slide.classList.remove('active-slide');
        }
    });

    // 3. Actualizar los botones del menú interactivo
    buttons.forEach((btn, index) => {
        if (index === targetIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

// Eventos al hacer clic en el menú del medio
buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        const targetIndex = parseInt(e.target.getAttribute('data-index'));
        updateCarousel(targetIndex);
    });
});

// Inicializar el carrusel en el primer elemento
if(slides.length > 0) {
    setTimeout(() => {
        updateCarousel(0);
    }, 150); // Un leve incremento para asegurar la carga completa del CSS en móviles
}

// Recalcular posiciones si el usuario cambia el tamaño de la ventana
let resizeTimeout;
window.addEventListener('resize', () => {
    // CAMBIO CLAVE: Limpia el temporizador anterior para evitar cálculos erráticos intermedios
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const activeDot = document.querySelector('.menu-dot.active');
        if (activeDot) {
            const currentIndex = parseInt(activeDot.getAttribute('data-index'));
            updateCarousel(currentIndex);
        }
    }, 100); // Espera 100ms a que el CSS móvil termine de asentarse
});
