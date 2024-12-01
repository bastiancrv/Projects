#!/bin/bash
echo "Nettoyage du projet..."
mvn clean

echo "Exécution des tests..."
mvn test

echo "Génération du rapport JaCoCo..."
mvn jacoco:report

echo "Rapport disponible dans target/site/jacoco/index.html"
