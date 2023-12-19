FROM node:16.10.0-alpine
ARG NODE_ENV
RUN mkdir -p /app

WORKDIR /app
COPY ./bot/package*.json /app/
COPY ./.env /app/
RUN yarn config set network-timeout 600000 -g && yarn install
COPY ./bot /app
ENV NODE_ENV=${NODE_ENV}
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
