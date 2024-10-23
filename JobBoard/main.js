document.addEventListener('DOMContentLoaded', function () {
    // Récupérer tous les liens "En savoir plus"
    const toggleLinks = document.querySelectorAll('.toggle-more')

    toggleLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault() // Empêche le comportement par défaut du lien

            // Trouver l'élément "more-info" associé
            const moreInfo = this.previousElementSibling

            // Basculer l'affichage de la section cachée
            if (
                moreInfo.style.display === 'none' ||
                moreInfo.style.display === ''
            ) {
                moreInfo.style.display = 'block' // Affiche la section
                this.textContent = 'Afficher moins' // Change le texte du lien
            } else {
                moreInfo.style.display = 'none' // Masque la section
                this.textContent = 'En savoir plus' // Change le texte du lien
            }
        })
    })
})
