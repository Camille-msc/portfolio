/* =============================================
   Navigation commune — Toutes les pages
   ============================================= */

// Menu hamburger (navigation mobile)
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile après clic sur un lien
    document.querySelectorAll('.nav-menu .nav-link').forEach(lien => {
        lien.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Gestion du mode sombre / clair
const boutonTheme = document.getElementById('themeToggle');
const corps       = document.body;

// Restaurer la préférence depuis le localStorage
const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde === 'dark') {
    corps.classList.add('dark-mode');
    if (boutonTheme) boutonTheme.innerHTML = '<i class="fas fa-sun"></i>';
}

if (boutonTheme) {
    boutonTheme.addEventListener('click', () => {
        corps.classList.toggle('dark-mode');
        if (corps.classList.contains('dark-mode')) {
            boutonTheme.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            boutonTheme.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Marquer le lien actif selon la page courante
document.addEventListener('DOMContentLoaded', () => {
    const pageCourante = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-menu .nav-link').forEach(lien => {
        const href = lien.getAttribute('href');
        if (href === pageCourante || (pageCourante === '' && href === 'index.html')) {
            lien.classList.add('active');
        } else {
            lien.classList.remove('active');
        }
    });

    // Timeline horizontale : molette verticale -> défilement horizontal
    document.querySelectorAll('.timeline-horizontal, .veille-timeline').forEach(zone => {
        zone.addEventListener('wheel', (event) => {
            // Si l'utilisateur maintient Shift ou utilise un trackpad horizontal, laisser le natif
            if (event.shiftKey) return;
            const deltaY = event.deltaY;
            const deltaX = event.deltaX;
            // Si le défilement est majoritairement vertical, le convertir en horizontal
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                // Vérifier qu'il y a du contenu à faire défiler
                const peutDefiler = zone.scrollWidth > zone.clientWidth;
                if (!peutDefiler) return;
                event.preventDefault();
                zone.scrollLeft += deltaY;
            }
        }, { passive: false });
    });
});
