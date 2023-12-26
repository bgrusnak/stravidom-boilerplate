FROM node:18-alpine
# Installing libvips-dev for sharp Compatability
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git > /dev/null 2>&1


# where our Strapi app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./backend/package*.json ./backend/yarn.lock /app/
COPY ./.env /app/

ENV PATH /app/node_modules/.bin:$PATH

# Install dependencies in /app
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install --production


# Copy the rest of our Strapi folder into /app
COPY ./backend /app

EXPOSE ${STRAPI_PORT}

# For production build
ENV NODE_ENV=${NODE_ENV}

# Build Strapi admin
RUN yarn build 

USER node

# Run yarn dev, as we would via the command line 
CMD ["yarn", "start"]