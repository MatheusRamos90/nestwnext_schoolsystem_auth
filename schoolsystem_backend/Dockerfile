FROM node:lts

RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app

USER root

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./

RUN yarn install --frozen-lockfile

ENV NODE_ENV prod

RUN yarn build