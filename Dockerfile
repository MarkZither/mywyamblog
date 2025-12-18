## Multi-stage Dockerfile: build Docusaurus in a Node stage, then serve with a tiny BusyBox HTTP server
## Goal: produce a very lightweight image that serves static files from `/www`

# Stage 1: build the static site with Node (alpine for small size)
FROM node:20-alpine AS builder
WORKDIR /app

# install deps first using only the package files for deterministic caching
COPY src/docs/package.json src/docs/package-lock.json ./src/docs/
WORKDIR /app/src/docs
RUN npm ci --silent

# copy rest of the docs sources and build
COPY src/docs/ .
RUN npm run build

# Stage 2: tiny runtime using alpine + busybox httpd (very small)
FROM alpine:3.18 AS runtime
# install busybox httpd and tini (tiny init to forward signals to PID 1)
RUN apk add --no-cache busybox-extras tini

COPY --from=builder /app/src/docs/build /www

EXPOSE 80
# Use tini as the init process so httpd receives signals correctly
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["httpd", "-f", "-p", "80", "-h", "/www"]
