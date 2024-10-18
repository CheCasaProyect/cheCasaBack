FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Compila el proyecto
RUN npm run build

# Comando para iniciar la aplicación
CMD ["node", "dist/main.js"]

