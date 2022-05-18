FROM node:16.15.0-alpine3.14

# Create app directory
WORKDIR /usr/src/app

ENV GLIBC_VERSION 2.30-r0

COPY package.json package-lock.json ./

RUN npm install

# Bundle app
COPY dist/bundle.min.js ./dist/

EXPOSE 8443

CMD [ "npm", "run", "prod" ]
