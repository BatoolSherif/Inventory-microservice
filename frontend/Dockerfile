FROM node:18  

WORKDIR /app  # Set the working directory in the container

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./  
# Install Node.js dependencies
RUN npm install  # This step installs all dependencies specified in `package.json`

# Copy the rest of the React project
COPY . .  

# Build the React app
RUN npm run build  # Build the production-ready React app

# Use `serve` to serve the built React app
RUN npm install -g serve  # Install `serve` globally
EXPOSE 3000  

CMD ["serve", "-s", "build", "-l", "3000"]  # Start the `serve` HTTP server
