FROM nginx:stable-alpine

# Copy custom nginx config (if present) to override default
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

# Copy the compiled static site into nginx www folder
# Adjust this path if your build output is elsewhere
COPY src/docs/build/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
