# Use an official Node.js image as the base image
FROM node:latest as node

# Set the working directory to /app
WORKDIR /app

# Copy the remaining files to the container
COPY . .

# Install the app dependencies
RUN npm install

# Build the Angular application in the container
RUN npm run build --prod

# Use the official nginx image as the base image
FROM nginx:alpine

# Copy the compiled Angular application from the previous step to the nginx public folder
COPY --from=node /app/dist/task-manager /usr/share/nginx/html
