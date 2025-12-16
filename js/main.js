// Sélection des éléments
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const contactForm = document.getElementById('contactForm');

// Fonction pour afficher la page active et cacher les autres
function showPage(pageId) {
    sections.forEach(section => {
        if (section.id === pageId) {
            section.classList.remove('page-inactive');
            section.classList.add('page-active', 'fade-in');
        } else {
            section.classList.remove('page-active', 'fade-in');
            section.classList.add('page-inactive');
        }
    });
}

// Navigation mobile
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile après avoir cliqué sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Identifier la section cible
        const targetId = link.getAttribute('href').substring(1);
        
        // Afficher la page correspondante
        showPage(targetId);
        
        // Mettre à jour la classe active sur les liens de navigation
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Fermer le menu mobile si ouvert
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Faire défiler vers la section (en haut de la page)
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Animation des barres de compétences
const skillSection = document.getElementById('competences');
const progressBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Animation lors du chargement de la page compétences
navLinks.forEach(link => {
    if (link.getAttribute('href') === '#competences') {
        link.addEventListener('click', animateSkills);
    }
});


// Gestion du formulaire de contact
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simuler l'envoi d'un formulaire
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simuler une réponse de serveur après 2 secondes
        setTimeout(() => {
            alert('Merci pour votre message ! Je vous répondrai dès que possible.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Gestion du mode dark/light
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Charger la préférence de thème depuis le localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Toggle du thème
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Changer l'icône
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Initialisation: afficher la page d'accueil par défaut
document.addEventListener('DOMContentLoaded', () => {
    showPage('accueil');
});