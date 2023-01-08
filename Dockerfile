FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

COPY . ./

RUN yarn install
RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY ./package.json .
COPY ./yarn.lock .
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

RUN chown -Rf node:node /app

USER node

CMD yarn start
