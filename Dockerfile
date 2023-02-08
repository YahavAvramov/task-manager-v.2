# Use an official Node.js image as the base image
FROM node:16 as build

# Set the working directory
WORKDIR /app

# Copy the remaining files to the container
COPY ./ app

# Install the app dependencies
RUN npm install

# Build the Angular application in the container
RUN npm run build 


# Use the official nginx image as the base image
FROM nginx:latest

# Copy the compiled Angular application from the previous step to the nginx public folder
COPY --from=build /app/dist/task-manager /usr/share/nginx/html

EXPOSE 80
