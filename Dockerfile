FROM node:8.5.0-slim

WORKDIR /usr/src/app

RUN \
    apt-get update && \
    apt-get install -y git && \
    npm i lerna -g --loglevel notice && \
    npm i pm2 -g --loglevel notice 

COPY package.json .
COPY clientstartscript.js .

RUN npm install --loglevel notice 

COPY packages/client ./packages/client
COPY packages/server ./packages/server

# install and build
COPY lerna.json .
RUN lerna bootstrap
RUN npm --prefix packages/server run build
RUN npm --prefix packages/client run build

EXPOSE 3000
EXPOSE 8080

CMD [ "npm", "start" ]