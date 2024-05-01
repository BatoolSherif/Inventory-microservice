# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port for the service
EXPOSE 3000

# Start the Node.js server
CMD ["node", "start-with-delay.js"]
