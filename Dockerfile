# TODO: push base to Docker hub to speed up build
FROM ubuntu:latest AS base
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update
RUN apt-get install -y npm curl rsync

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
RUN mkdir $NVM_DIR
ENV NODE_VERSION 14.19.0
ENV NODE_PATH $NVM_DIR/$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

RUN echo "source $NVM_DIR/nvm.sh && \
    nvm install $NODE_VERSION && \
    nvm alias default $NODE_VERSION && \
    nvm use default" | bash


RUN npm install -g typescript@latest

FROM base as build
# FROM tts-ui:base AS build

RUN mkdir -p /usr/src
COPY . /usr/src/

WORKDIR /usr/src/lib
RUN npm install
RUN tsc -p .

# FROM build as build_client
# FROM tts-ui:build as build_client
# build client
WORKDIR /usr/src/client
RUN npm install
RUN npm run build
RUN cp -r dist /srv/

# FROM build as build_server
# # FROM tts-ui:build as build_server
# build server
WORKDIR /usr/src/server
RUN node -v
RUN echo "CLIENT_BUNDLE_DIR=/srv/dist/tts-ui-client" >> .env
RUN mkdir -p /etc/tts-ui
RUN echo "SERVER_CONFIG_PATH=/etc/tts-ui/state.config.json" >> .env
RUN npm install
RUN npm run build
RUN ls /usr/src
RUN mkdir -p /usr/src/output

# FROM build AS deploy
# # FROM tts-ui:build AS deploy
# WORKDIR /usr/src/server
# COPY --from=build_client /srv /srv
# COPY --from=build_server /usr/src/app /usr/src/app
# TODO: define environment variables here and pass them in
ENV PORT=3550
ENV CLIENT_BUNDLE_DIR=/srv/dist/tts-ui-client
ENV SERVER_CONFIG_PATH=/etc/tts-ui/state.config.json
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
CMD ["node", "dist/src/main.js"]

# TODO get tests passing
# FROM deploy as test
# COPY ./test /test

# # TODO: set up tests
# CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]

# TODO: pass environment variables for client and server in deployment (pipeline tests too)