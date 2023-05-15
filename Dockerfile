FROM node:18-alpine as dev

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT [ "" ]