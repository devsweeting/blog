# // SPecify base image
FROM node:16-alpine

# Set wroking directory to '/app' i nteh container, all followign commands will be issues relative to this dir
WORKDIR /app
# Copy over only the package.json file
COPY package.json ./
# Install; app dependencies
RUN npm install
# Copy over all of our remaining source code
COPY ./ ./

# Set the command to run when the container starts up
CMD ["npm", "start"]

# Run with `docker build .`