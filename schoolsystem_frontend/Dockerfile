FROM node:lts

RUN mkdir -p /usr/src/app
RUN chmod -R 777 /usr/src/app

USER root

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./

RUN yarn install --frozen-lockfile

RUN yarn build

# FROM node:lts as dependencies
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# FROM node:lts as builder
# WORKDIR /usr/src/app
# COPY . .
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
# RUN yarn build

# FROM node:lts as runner
# WORKDIR /usr/src/app

# # If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /usr/src/app/next.config.js ./

# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./package.json
