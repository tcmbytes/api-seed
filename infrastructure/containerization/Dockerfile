FROM node:13-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080
CMD [ "node", "./delivery/api/app.js" ]