# Dockerfile

# ---- Base Node Stage ----
# Use an official Node.js LTS version as a parent image
# Alpine Linux is used for its small size
FROM node:18-alpine AS base
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# ---- Dependencies Stage ----
# Install app dependencies
FROM base AS dependencies
RUN npm install
# If you were using yarn:
# COPY yarn.lock ./
# RUN yarn install

# ---- Development Stage ----
# This stage will be used for local development with hot-reloading
FROM dependencies AS development
# Copy the rest of the application code
COPY . .
# Expose the Vite development server port
EXPOSE 5173
# Command to run the Vite development server
CMD ["npm", "run", "dev"]


# ---- Build Stage ----
# This stage builds the React app for production
FROM dependencies AS builder
# Copy the rest of the application code
COPY . .
# Set build-time environment variables if needed
# ARG VITE_API_BASE_URL
# ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# ---- Production Stage ----
# This stage serves the built static files using Nginx
FROM nginx:alpine AS production
# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/
# Copy the built static files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose port 80 (Nginx default)
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]