# Stage 1: Build the React application
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# We need to pass environment variables during build time for Vite
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
ARG VITE_NVIDIA_NIM_API_KEY
ENV VITE_NVIDIA_NIM_API_KEY=$VITE_NVIDIA_NIM_API_KEY
ARG VITE_TAVILY_API_KEY
ENV VITE_TAVILY_API_KEY=$VITE_TAVILY_API_KEY
ARG VITE_GCP_API_KEY
ENV VITE_GCP_API_KEY=$VITE_GCP_API_KEY
RUN npm run build


# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy build files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html
# Custom Nginx config to handle React Router and Cloud Run $PORT
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Cloud Run sets the PORT environment variable
CMD ["sh", "-c", "sed -i 's/listen 80;/listen '\"$PORT\"';/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
