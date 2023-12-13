FROM node:lts

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
COPY --chown=node:node . .
RUN npm run build

# Copy the .env file into the container image
COPY .env ./

# Create upload directory
# RUN mkdir ./upload

EXPOSE 8000
CMD [ "node", "dist/app.js" ]