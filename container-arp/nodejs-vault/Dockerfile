FROM node:10

WORKDIR /home/node

COPY . /home/node

RUN npm ci --production

CMD ["node", "vault.js"]