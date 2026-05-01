# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build



# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy build files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Custom Nginx config to handle React Router and Cloud Run $PORT
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Cloud Run sets the PORT environment variable
CMD ["sh", "-c", "sed -i 's/listen 80;/listen '\"$PORT\"';/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
