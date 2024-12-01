import os

def list_files_with_content(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    print(f'"{file}" -- "{content}"\n')
            except Exception as e:
                print(f"Erreur lors de la lecture du fichier {file}: {e}")

# Spécifiez ici le répertoire contenant vos fichiers
directory_path = "src/main/"  # Remplacez par le chemin de votre répertoire
list_files_with_content(directory_path)
