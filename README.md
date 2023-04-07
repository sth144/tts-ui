# tts-ui

[![Docker Image CI](https://github.com/sth144/tts-ui/actions/workflows/ci-main.yml/badge.svg)](https://github.com/sth144/tts-ui/actions/workflows/ci-main.yml)

A text-to-speech web UI and backend for converting text to dictated MP3 files. The frontend uses Angular, and the backend runs NestJS (Node.JS).

## Build

### Server

`[server]$ npm install`
`[server]$ nest build`

### Client

`[client]$ npm install`
`[client]$ ng build`

## Run

`[server]$ nest start`

## Deploy

- Build Docker image
- Pull Docker image into desired environment
- Run

## Usage

## TODO:

- auth (https://medium.com/@nielsmeima/auth-in-nest-js-and-angular-463525b6e071)
- WebDAV for CRUD on server & remote
- UI progress bar for uploads
- message broker and task queue for long running tasks
  - UI progress display for conversion
- remote sync feature
  - UI sync control with progress display
- show new files without reload
- prettify UI
- local delete feature (UI)
- show files on remote
  - remote delete feature?
- relative paths for all packages
- get tests working
- get debuggers working
- get CI/CD working
- record demo
- build badge
- instructions
