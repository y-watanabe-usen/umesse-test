FROM node:alpine

ENV HOME=/webapp \
    LANG=C.UTF-8  \
    TZ=Asia/Tokyo \
    HOST=0.0.0.0

WORKDIR ${HOME}

RUN apk update && \
    apk add git && \
    npm install -g npm && \
    npm install -g vue-cli
RUN yarn install
RUN yarn add axios vue-js-modal 

EXPOSE 3001
CMD [ "yarn", "dev" ]