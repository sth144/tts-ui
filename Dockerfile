# TODO: push base to Docker hub to speed up build
FROM debian:buster-slim AS base
RUN apt-get update
RUN pwd
RUN ls
RUN apt-get install -y npm \
                    nodejs 
RUN npm install -g typescript@latest

FROM base as build
# FROM tts-ui:base AS build

RUN ls
RUN COPY . .
#RUN mkdir -p /usr/src

#COPY lib /usr/src/lib
# WORKDIR /usr/src/lib
# RUN npm install
# RUN tsc -p .

# FROM build as build_client
# # FROM tts-ui:build as build_client
# # build client
# COPY ./client /usr/src/client
# WORKDIR /usr/src/client
# RUN npm install
# RUN npm run build
# RUN cp -r build /srv/

# FROM build as build_server
# # FROM tts-ui:build as build_server
# # build server
# COPY ./server /usr/src/app
# WORKDIR /usr/src/app
# RUN echo "CLIENT_BUNDLE_DIR=/srv/build" >> .env
# RUN npm install
# RUN npm run build

# FROM build AS deploy
# # FROM tts-ui:build AS deploy
# WORKDIR /usr/src/app
# COPY --from=build_client /srv /srv
# COPY --from=build_server /usr/src/app /usr/src/app
# # TODO: define environment variables here and pass them in
# ENV PORT=8000
# ARG NODE_ENV=prod
# ENV NODE_ENV=${NODE_ENV}
# CMD ["npm", "start"]

# FROM deploy as test
# COPY ./test /test

# # TODO: set up tests
# CMD ["/test/test.sh", "-s", "/usr/src/app", "-c", "/srv", "test"]

# TODO: pass environment variables for client and server in deployment (pipeline tests too)