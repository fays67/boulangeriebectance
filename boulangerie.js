/* =====================================================
   JAVASCRIPT - BoulangerieBectance
   Fichier : boulangerie.js

   Ce fichier contient 5 fonctionnalités :
   1. Menu burger (mobile)
   2. Bouton retour en haut
   3. Zoom photo (modale)
   4. Téléphone : chiffres uniquement
   5. Validation du formulaire
   ===================================================== */


/* =====================================================
   1. MENU BURGER
   Sur mobile, le bouton ☰ affiche ou cache le menu.
   ===================================================== */

// On récupère le bouton burger et la liste du menu
var burger = document.getElementById('bouton-burger');
var menu   = document.querySelector('.menu');

// Au clic sur le burger : ajoute ou enlève la classe "menu-ouvert"
burger.addEventListener('click', function() {
    menu.classList.toggle('menu-ouvert');
});

// Si on clique sur un lien du menu → on ferme le menu
var liensMenu = document.querySelectorAll('.menu a');
for (var i = 0; i < liensMenu.length; i++) {
    liensMenu[i].addEventListener('click', function() {
        menu.classList.remove('menu-ouvert');
    });
}


/* =====================================================
   2. BOUTON RETOUR EN HAUT
   Apparaît quand on descend à plus de 300px du haut.
   ===================================================== */

var boutonHaut = document.getElementById('bouton-haut');

// À chaque défilement de la page
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        boutonHaut.classList.add('visible');    // on affiche le bouton
    } else {
        boutonHaut.classList.remove('visible'); // on cache le bouton
    }
});

// Au clic : on remonte tout en haut en douceur
boutonHaut.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* =====================================================
   3. ZOOM PHOTO (MODALE)
   Cliquer sur une photo de la galerie l'affiche en grand.
   ===================================================== */

var photos       = document.querySelectorAll('.galerie-img');
var modale       = document.getElementById('modale-photo');
var modaleImg    = document.getElementById('modale-img');
var modaleFermer = document.getElementById('modale-fermer');

// Pour chaque photo de la galerie, on ajoute un clic
for (var j = 0; j < photos.length; j++) {
    photos[j].addEventListener('click', function() {
        modaleImg.src = this.src; // on copie la source de la photo cliquée
        modaleImg.alt = this.alt;
        modale.classList.add('modale-visible'); // on affiche la modale
    });
}

// Clic sur ✕ → on ferme la modale
modaleFermer.addEventListener('click', function() {
    modale.classList.remove('modale-visible');
});

// Clic en dehors de la photo → on ferme aussi
modale.addEventListener('click', function(e) {
    if (e.target === modale) {
        modale.classList.remove('modale-visible');
    }
});


/* =====================================================
   4. TÉLÉPHONE : CHIFFRES UNIQUEMENT
   Bloque les lettres à la frappe dans le champ tel.
   ===================================================== */

var champTel = document.getElementById('telephone');

champTel.addEventListener('keypress', function(e) {
    // Si la touche appuyée n'est pas un chiffre ou un espace → on la bloque
    if (!/[\d\s]/.test(e.key)) {
        e.preventDefault();
    }
});


/* =====================================================
   5. VALIDATION DU FORMULAIRE
   Vérifie chaque champ avant l'envoi.
   ===================================================== */

var formulaire = document.querySelector('form');

formulaire.addEventListener('submit', function(e) {
    e.preventDefault(); // on bloque l'envoi pour vérifier d'abord

    var valide = true;        // sera mis à false si une erreur est trouvée
    var premierErreur = null; // on garde le 1er champ en erreur pour y défiler

    // -- Vérification nom --
    var champNom = document.getElementById('nom');
    if (champNom.value.trim() === '') {
        afficherErreur(champNom, 'Veuillez entrer votre nom.');
        valide = false;
        if (!premierErreur) premierErreur = champNom;
    } else {
        supprimerErreur(champNom);
    }

    // -- Vérification email (doit contenir @ et un point) --
    var champEmail = document.getElementById('email');
    var valEmail   = champEmail.value.trim();
    if (valEmail === '') {
        afficherErreur(champEmail, 'Veuillez entrer votre email.');
        valide = false;
        if (!premierErreur) premierErreur = champEmail;
    } else if (!valEmail.includes('@') || !valEmail.includes('.')) {
        afficherErreur(champEmail, 'Email invalide. Exemple : nom@email.fr');
        valide = false;
        if (!premierErreur) premierErreur = champEmail;
    } else {
        supprimerErreur(champEmail);
    }

    // -- Vérification téléphone (chiffres uniquement, si rempli) --
    var valTel = champTel.value.trim().replace(/\s/g, ''); // on enlève les espaces
    if (valTel !== '') {
        if (!/^\d+$/.test(valTel)) {
            afficherErreur(champTel, 'Le téléphone doit contenir uniquement des chiffres.');
            valide = false;
            if (!premierErreur) premierErreur = champTel;
        } else if (valTel.length < 10) {
            afficherErreur(champTel, 'Le téléphone doit avoir au moins 10 chiffres.');
            valide = false;
            if (!premierErreur) premierErreur = champTel;
        } else {
            supprimerErreur(champTel);
        }
    } else {
        supprimerErreur(champTel);
    }

    // -- Vérification motif --
    var champMotif = document.getElementById('motif');
    if (champMotif.value === '') {
        afficherErreur(champMotif, 'Veuillez choisir un motif.');
        valide = false;
        if (!premierErreur) premierErreur = champMotif;
    } else {
        supprimerErreur(champMotif);
    }

    // -- Vérification message --
    var champMessage = document.getElementById('message');
    if (champMessage.value.trim() === '') {
        afficherErreur(champMessage, 'Veuillez écrire un message.');
        valide = false;
        if (!premierErreur) premierErreur = champMessage;
    } else {
        supprimerErreur(champMessage);
    }

    // -- Vérification case à cocher --
    var champCase = document.getElementById('consentement');
    if (!champCase.checked) {
        afficherErreur(champCase, 'Vous devez cocher cette case pour continuer.');
        valide = false;
        if (!premierErreur) premierErreur = champCase;
    } else {
        supprimerErreur(champCase);
    }

    // -- Résultat final --
    if (valide) {
        afficherSucces(); // tout est bon → message vert
    } else {
        premierErreur.scrollIntoView({ behavior: 'smooth', block: 'center' }); // on va au 1er champ en erreur
    }
});


/* =====================================================
   FONCTIONS UTILITAIRES
   Utilisées par la validation ci-dessus.
   ===================================================== */

// Affiche un message d'erreur rouge sous un champ
function afficherErreur(champ, message) {
    supprimerErreur(champ);              // on efface l'ancienne erreur
    champ.style.borderColor = '#E24B4A'; // bordure rouge sur le champ

    var p = document.createElement('p'); // on crée un paragraphe
    p.classList.add('message-erreur');
    p.textContent = message;
    champ.parentNode.appendChild(p);     // on l'ajoute sous le champ
}

// Supprime le message d'erreur d'un champ
function supprimerErreur(champ) {
    champ.style.borderColor = '';
    var erreur = champ.parentNode.querySelector('.message-erreur');
    if (erreur) {
        erreur.remove();
    }
}

// Affiche le message de succès vert et remet le formulaire à zéro
function afficherSucces() {
    var succes = document.getElementById('message-succes');
    succes.classList.add('visible'); // on affiche le message vert
    formulaire.reset();              // on vide tous les champs

    succes.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Le message disparaît automatiquement après 5 secondes
    setTimeout(function() {
        succes.classList.remove('visible');
    }, 5000);
}