# Use Node 16 as the parent image
FROM node:14

# Set up the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the container
COPY ./package*.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY ./ /usr/src/app/

# Command to run the application
CMD ["node", "index.js"]

