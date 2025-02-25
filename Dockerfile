# Use Node.js v21 as the base image
FROM node:21

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (adjust based on your app)
EXPOSE 8081

CMD ["node", "index.js"]