FROM node:16.15.0-alpine3.14

# Create app directory
WORKDIR /usr/src/app

ENV GLIBC_VERSION 2.30-r0

# Download and install glibc, required by AAPT
# RUN apk add --update curl && \
#   curl -Lo /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
#   curl -Lo glibc.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-${GLIBC_VERSION}.apk" && \
#   curl -Lo glibc-bin.apk "https://github.com/sgerrand/alpine-pkg-glibc/releases/download/${GLIBC_VERSION}/glibc-bin-${GLIBC_VERSION}.apk" && \
#   apk add glibc-bin.apk glibc.apk && \
#   /usr/glibc-compat/sbin/ldconfig /lib /usr/glibc-compat/lib && \
#   echo 'hosts: files mdns4_minimal [NOTFOUND=return] dns mdns4' >> /etc/nsswitch.conf && \
#   apk del curl && \
#   rm -rf glibc.apk glibc-bin.apk /var/cache/apk/*

# Install app dependencies
#COPY package.json .
# For npm@5 or later, copy package-lock.json as well
COPY package.json package-lock.json ./

# required to build and install bcrypt
RUN apk add --update --no-cache make gcc g++ python3 && ln -sf python3 /usr/bin/python && \
  npm install && \
  apk del make gcc g++ python3

# Bundle app
COPY dist/bundle.min.js ./dist/
COPY key.pem ./
COPY public.pem ./
# COPY bin ./bin/

# https://www.datanovia.com/en/courses/docker-compose-wait-for-dependencies/
# ENV DOCKERIZE_VERSION v0.6.1
# RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
#     && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 8443

CMD [ "npm", "run", "prod" ]
