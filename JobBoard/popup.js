function openLoginPopup() {
    document.getElementById('loginPopup').style.display = 'block'
}

function closeLoginPopup() {
    document.getElementById('loginPopup').style.display = 'none'
}

function openLoginPopup2() {
    document.getElementById('loginPopup2').style.display = 'block'
}

function closeLoginPopup2() {
    document.getElementById('loginPopup2').style.display = 'none'
}

function storeIdu(id, prenom, nom, email, fonction) {
    localStorage.setItem('id_utilisateur', id)
    localStorage.setItem('prenom_utilisateur', prenom)
    localStorage.setItem('nom_utilisateur', nom)
    localStorage.setItem('email_utilisateur', email)
    localStorage.setItem('fonction_utilisateur', fonction)
}

function storeIde(id, nom, desc, lieu) {
    localStorage.setItem('id_entrep', id)
    localStorage.setItem('nom_entrep', nom)
    sessionStorage.setItem('desc_entrep', desc)
    localStorage.setItem('lieu_entrep', lieu)
}
function storeIda(id, titre, identrep, contrat, offre, salaire) {
    localStorage.setItem('id_annonces', id)
    localStorage.setItem('titre', titre)
    localStorage.setItem('identrep', identrep)
    localStorage.setItem('contrat', contrat)
    localStorage.setItem('offre', offre)
    localStorage.setItem('salaire', salaire)
}

function storeIdc(id, idu, ida, msg) {
    localStorage.setItem('idc', id)
    localStorage.setItem('idu', idu)
    localStorage.setItem('ida', ida)
    localStorage.setItem('message', msg)
}

const userId = localStorage.getItem('id_utilisateur')
const userPrenom = localStorage.getItem('prenom_utilisateur')
const userNom = localStorage.getItem('nom_utilisateur')
const userEmail = localStorage.getItem('email_utilisateur')
const userFonction = localStorage.getItem('fonction_utilisateur')

const annonceId = localStorage.getItem('id_annonces')
const annonceTitle = localStorage.getItem('titre')
const annonceEntrepid = localStorage.getItem('identrep')
const annonceContrat = localStorage.getItem('contrat')
const annonceOffre = localStorage.getItem('offre')
const annonceSalaire = localStorage.getItem('salaire')

const entrepId = localStorage.getItem('id_entrep')
const entrepNom = localStorage.getItem('nom_entrep')
const entrepDesc = sessionStorage.getItem('desc_entrep')
const entrepLieu = localStorage.getItem('lieu_entrep')

const candidId = localStorage.getItem('idc')
const candidIdu = localStorage.getItem('idu')
const candidIda = localStorage.getItem('ida')
const candidMsg = localStorage.getItem('message')

// Entreprise

var entrepElement = document.getElementById('entrep_id')
var entrepnom = document.getElementById('nom')
var entrepdesc = document.getElementById('description')
var entreplieu = document.getElementById('lieu')
if (entrepElement) {
    entrepElement.value = entrepId
    entrepnom.value = entrepNom
    entrepdesc.value = entrepDesc
    entreplieu.value = entrepLieu
}

// Utilisateur

var userElement = document.getElementById('user_id')
var userprenom = document.getElementById('prenom')
var usernom = document.getElementById('nom')
var useremail = document.getElementById('email')
var userfonction = document.getElementById('fonction')
if (userElement) {
    userElement.value = userId
    userprenom.value = userPrenom
    usernom.value = userNom
    useremail.value = userEmail
    userfonction.value = userFonction
}

// Annonce

var annonceElement = document.getElementById('id_annonces')
var annonceTitre = document.getElementById('titre')
var annonceentrepid = document.getElementById('id_entrep')
var annoncecontrat = document.getElementById('contrat')
var annonceoffre = document.getElementById('offre')
var annoncesalaire = document.getElementById('salaire')
if (annonceElement) {
    annonceElement.value = annonceId
    annonceTitre.value = annonceTitle
    annonceentrepid.value = annonceEntrepid
    annoncecontrat.value = annonceContrat
    annonceoffre.value = annonceOffre
    annoncesalaire.value = annonceSalaire
}

// Candidature

var candidElement = document.getElementById('idc')
var candididu = document.getElementById('idu')
var candidida = document.getElementById('ida')
var candidmsg = document.getElementById('msg')
if (candidElement) {
    candidElement.value = candidId
    candididu.value = candidIdu
    candidida.value = candidIda
    candidmsg.value = candidMsg
}
