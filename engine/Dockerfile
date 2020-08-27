FROM node:latest
WORKDIR /srv/app

COPY package*.json ./
RUN npm install --production

COPY index.js ./

EXPOSE 4000
CMD [ "node", "index.js" ]