# Use a base image (preferably a Node.js image)
FROM node:18.17.1-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm ci

COPY --chown=node:node . .

USER node

#####################
#BUILD FOR PRODUCTION

FROM node:18.17.1-alpine AS build

WORKDIR /usr/src/app

# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node


##################
#THE PRODUCTION

FROM node:18.17.1-alpine AS production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Command to start your app
CMD [ "node", "dist/main.js" ]
