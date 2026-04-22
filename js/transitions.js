/* =============================================
   Transitions de navigation entre pages
   Utilise uniquement opacity + transform (GPU)
   ============================================= */

const DUREE_SORTIE  = 230; // ms — animation de sortie
const DUREE_ENTREE  = 260; // ms — animation d'entrée

/* Vérifier si un lien mène vers une autre page interne */
function estNavigationInterne(lien) {
    const href = lien.getAttribute('href');
    if (!href)                            return false;
    if (lien.target === '_blank')         return false;
    if (lien.hasAttribute('download'))    return false;
    // Ancre pure ou lien de détail projet (hash)
    if (href.startsWith('#'))             return false;
    if (href.startsWith('mailto:'))       return false;
    if (href.startsWith('tel:'))          return false;
    // Liens externes
    if (href.startsWith('http://') || href.startsWith('https://')) return false;
    // Doit pointer vers un fichier .html
    const nomFichier = href.split('?')[0].split('#')[0];
    return nomFichier.endsWith('.html');
}

/* Animation d'ENTRÉE au chargement de la page */
document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (!main) return;

    // Appliquer l'état initial invisible (sans transition active)
    main.classList.add('main-entree');

    // Double requestAnimationFrame : le navigateur rend d'abord l'état initial,
    // puis la transition CSS prend le relai pour animer vers l'état visible
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            main.classList.add('main-transition');
            main.classList.remove('main-entree');
        });
    });
});

/* Animation de SORTIE au clic sur un lien interne */
document.addEventListener('click', (e) => {
    const lien = e.target.closest('a[href]');
    if (!lien || !estNavigationInterne(lien)) return;

    // Ne pas animer si on reste sur la même page
    const pageCourante = window.location.pathname.split('/').pop() || 'index.html';
    const cible = lien.getAttribute('href').split('?')[0].split('#')[0];
    if (cible === pageCourante) return;

    e.preventDefault();

    const main = document.querySelector('main');
    const destination = lien.getAttribute('href');

    if (!main) {
        window.location.href = destination;
        return;
    }

    // Déclencher l'animation de sortie
    main.classList.add('main-transition', 'main-sortie');

    // Naviguer après la fin de l'animation
    setTimeout(() => {
        window.location.href = destination;
    }, DUREE_SORTIE);
});
