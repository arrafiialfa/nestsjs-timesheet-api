# Use a base image (preferably a Node.js image)
FROM node:18.17.1

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on (assuming NestJS default is 3000)
EXPOSE 3000

# Command to start your app
CMD ["npm", "run", "start"]
