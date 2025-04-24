# Etapa 1: build
FROM node:18 as build-stage
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Etapa 2: nginx
FROM nginx:alpine
COPY --from=build-stage /app/dist/frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
