# TODO: push base to Docker hub to speed up build
FROM debian:buster-slim AS base
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN apt-get update
RUN apt-get install -y npm curl

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 19.8.1

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh 
RUN nvm install $NODE_VERSION 
RUN nvm alias default $NODE_VERSION 
RUN nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN node -v

RUN npm install -g typescript@latest

FROM base as build
# FROM tts-ui:base AS build

RUN mkdir -p /usr/src
COPY . /usr/src/

# TODO: get this working
# WORKDIR /usr/src/lib
# RUN npm install
# RUN tsc -p .

FROM build as build_client
# FROM tts-ui:build as build_client
# build client
WORKDIR /usr/src/client
RUN npm install
RUN npm run build
RUN cp -r build /srv/

FROM build as build_server
# # FROM tts-ui:build as build_server
# build server
WORKDIR /usr/src/server
RUN node -v
RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >> .env
RUN npm install
RUN npm run build

# FROM build AS deploy
# # FROM tts-ui:build AS deploy
# WORKDIR /usr/src/server
# COPY --from=build_client /srv /srv
# COPY --from=build_server /usr/src/app /usr/src/app
# TODO: define environment variables here and pass them in
ENV PORT=8000
ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}
CMD ["npm", "start"]

# TODO get tests passing
# FROM deploy as test
# COPY ./test /test

# # TODO: set up tests
# CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]

# TODO: pass environment variables for client and server in deployment (pipeline tests too)