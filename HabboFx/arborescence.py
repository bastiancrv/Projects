import os

def afficher_arborescence(chemin, prefix=""):
    """
    Parcours et affiche une arborescence de fichiers à partir d'un chemin donné.
    """
    fichiers = os.listdir(chemin)
    fichiers.sort()
    for index, fichier in enumerate(fichiers):
        chemin_complet = os.path.join(chemin, fichier)
        is_last = index == len(fichiers) - 1
        print(f"{prefix}{'└── ' if is_last else '├── '}{fichier}")
        if os.path.isdir(chemin_complet):
            sous_prefix = "    " if is_last else "│   "
            afficher_arborescence(chemin_complet, prefix + sous_prefix)

chemin_projet = "src/"
afficher_arborescence(chemin_projet)
