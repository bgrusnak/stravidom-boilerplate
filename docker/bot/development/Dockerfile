FROM node:16.10.0-alpine

RUN mkdir -p /app
WORKDIR /app

# Copy package.json and package-lock.json
# to the /app working directory
COPY ./bot/package*.json /app/
COPY ./.env /app/

# Install dependencies in /app
RUN yarn config set network-timeout 600000 -g && yarn install

# Copy the rest of our Next.js folder into /app
COPY ./bot /app

# Run yarn dev, as we would via the command line 
CMD [ "yarn", "dev" ]
