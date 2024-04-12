# Use the official Node.js 21.7.3 image
FROM node:21.7.3-alpine3.19

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Healthcheck on port $PORT
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD ["node", "./utils/healthcheck.js"]

# Expose the port that the application will listen on $PORT
ENV NODE_ENV=production
EXPOSE $PORT

# Start the application
ENTRYPOINT ["npm", "run", "start"]