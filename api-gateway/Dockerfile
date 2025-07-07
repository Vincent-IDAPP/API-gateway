# Utilise la dernière version stable de Node.js
FROM node:current

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie uniquement les fichiers nécessaires à l'installation
COPY package*.json ./

# Installation des dépendances (dev + prod)
RUN npm install

# Installation globale de nodemon pour le hot reload
RUN npm install -g nodemon

# Copie tout le projet
COPY . .

# Expose le port utilisé par l’app (3000 pour l’API Gateway, 5001 pour Auth)
EXPOSE 3000

# Commande de démarrage avec hot reload
CMD ["nodemon", "gateway.js"]
