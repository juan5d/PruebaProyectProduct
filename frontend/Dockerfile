# Etapa 1: build de Angular
FROM node:18 as build-stage

WORKDIR /app

# Copiamos package.json y package-lock.json para aprovechar el cache de docker
COPY package*.json ./

# Instalamos Angular CLI de forma global y las dependencias del proyecto
RUN npm install -g @angular/cli && npm install

# Copiamos el resto del código
COPY . .

# Hacemos el build de producción
RUN ng build --configuration production

# Etapa 2: nginx
FROM nginx:alpine

# Copiamos el resultado del build a la carpeta que sirve nginx
COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

# Reemplazamos el archivo de configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
