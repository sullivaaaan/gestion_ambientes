document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const modules = document.querySelectorAll('.module');
    let currentModuleIndex = 0; // Inicia en el primer módulo

    // Función para mostrar un módulo específico
    function showModule(index) {
        // Oculta todos los módulos
        modules.forEach(module => {
            module.classList.remove('active');
            module.style.display = 'none'; // Oculta para que no ocupe espacio
        });

        // Muestra el módulo actual
        if (modules[index]) {
            modules[index].style.display = 'block'; // Muestra el módulo
            // Pequeño retardo para asegurar que el display esté establecido antes de la animación
            setTimeout(() => {
                modules[index].classList.add('active');
            }, 50);

            // Actualiza la clase 'active' en el menú de navegación
            navLinks.forEach(link => link.classList.remove('active'));
            const targetId = modules[index].id;
            const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    // Inicializar: mostrar solo el primer módulo al cargar la página
    showModule(currentModuleIndex);

    // Navegación por clics en el menú
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto de anclaje
            const targetId = link.getAttribute('href').substring(1);
            const targetModule = document.getElementById(targetId);
            if (targetModule) {
                currentModuleIndex = Array.from(modules).indexOf(targetModule);
                showModule(currentModuleIndex);
            }
            // Opcional: desplazar la vista al inicio del módulo si el encabezado es fijo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Navegación con flechas del teclado (opcional, para una experiencia tipo presentación)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            if (currentModuleIndex < modules.length - 1) {
                currentModuleIndex++;
                showModule(currentModuleIndex);
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            if (currentModuleIndex > 0) {
                currentModuleIndex--;
                showModule(currentModuleIndex);
            }
        }
    });

    // Si la URL tiene un hash, navega a esa sección al cargar
    if (window.location.hash) {
        const initialTargetId = window.location.hash.substring(1);
        const initialTargetModule = document.getElementById(initialTargetId);
        if (initialTargetModule) {
            currentModuleIndex = Array.from(modules).indexOf(initialTargetModule);
            showModule(currentModuleIndex);
        }
    }
});
    // Mostrar/ocultar sidebar en móvil
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    // Cierra el sidebar al hacer clic en un enlace (solo móvil)
    const navLinks = document.querySelectorAll('#sidebar .nav-link');

    function openSidebar() {
        sidebar.classList.remove('-translate-x-full');
    }
    function closeSidebar() {
        sidebar.classList.add('-translate-x-full');
    }

    sidebarToggle.addEventListener('click', function() {
        if (sidebar.classList.contains('-translate-x-full')) {
            openSidebar();
        } else {
            closeSidebar();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) closeSidebar();
        });
    });

    // Cierra el sidebar si se hace clic fuera de él en móvil
    document.addEventListener('click', function(e) {
        if (window.innerWidth >= 768) return;
        if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
            closeSidebar();
        }
    });
    