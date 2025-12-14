## Multi-stage Dockerfile: build Docusaurus in a Node stage, then serve with nginx

# Stage 1: build the static site
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install deps for deterministic cache
COPY src/docs/package.json src/docs/package-lock.json ./src/docs/
WORKDIR /app/src/docs
RUN npm ci --silent

# Copy rest of the docs source and build
COPY src/docs/ .
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/src/docs/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
