# Dockerized Telegram miniapp environment

Using PostgreSQL for the database, Strapi backend and admin part, Vue3/Vite/Ionic frontend, Telegraf for the bot and Redis as message broker.

## Table of Contents <!-- omit in toc -->

- [Current Status](#current-status)
- [What for?](#what-for)
- [Features & Stacks](#features--stacks)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Database](#database)
    - [Reverse Proxy](#reverse-proxy)
    - [Containerization](#containerization)
    - [Environment Variables Management](#environment-variables-management)
- [Installation and Usage](#installation-and-usage)
    - [Installation](#installation)
    - [Usage](#usage)
- [Security for Endpoints](#security-for-endpoints)
- [Contributing](#contributing)
- [Authors](#authors)
- [License](#license)

## Current Status

This package is currently under development and should be consider **BETA** in terms of state. We are currently accepting contributions to help develop and maintain this package.

For more information on contributing please see [the contrib message below](#contributing).

##  What for?

- Easy development & production environment
- Easy frontend adoption (just delete frontend folder and create your best)
- Creating full-stack applications for small or medium size projects

## Features & Stacks

#### Backend
- Strapi v4
- Node.js v18-alpine for Docker Image
- Yarn package manager
#### Frontend
- Vue3 v?
- Ionic v?
- Typescript v4.7
- Node.js v18-alpine for Docker Image
- Yarn package manager
#### Bot
- Telegraf v? 
- Nodejs:16.10.0-alpine for Docker Image
- Yarn package manager
#### Database
- Postgres v15-alpine
- Linux/amd64 platform for platform error on Apple M1 chips
- Named volumes
#### Redis
- Redis v7.2.3-alpine
#### Reverse Proxy
- Nginx Latest
- Fastcgi support
- Mime-types
- Security configs
#### Containerization
- Docker-compose v3 for container orchestration 🐳
- Seperated Dockerfiles for development and production
#### Environment Variables Management
- One file for backend + frontend + database + nginx


## Installation and Usage
You have to currently exist Docker and Docker Compose on your system:
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

#### Installation
- Clone the repo
- Copy `.env.example` file to `.env`
- Change credentials with secure and strong ones
- If you are on development, be sure `ENVIRONMENT=development` on .env file
- If you are on production or want to production build, change with `ENVIRONMENT=production`
- Be sure `localhost:HTTP_PORT` is accesible and not using from another process (Nginx runs on the port provided in the .env file as HTTP_PORT)
- Pull necessary images:
```bash
docker-compose pull
```
#### Usage
- Build and up your docker-compose file if everything is ok:
```bash
docker-compose build && docker-compose up -d
```
- Now you can access to Vue frontend on `http://localhost:HTTP_PORT` and Strapi backend (admin) on `http://localhost:HTTP_PORT/admin`
- First you need to create an admin on page `http://localhost:HTTP_PORT/admin/auth/register-admin`
- Register with your e-mail and password.
- Go to `Content-Type Builder`, It has sample content type as `Article` and this content type has three field as `title` `body` and `cover`.
- For creating new `Article`, go to `Content Manager`and click `Article`on left pane, click `Create new entry`and fill the blanks > click Publish!
- For testing API endpoint you need to give public access to the `Article` so
	- Go to `Settings`>`User & Permissions Plugin`>`Roles`>`Public`>`Article`and select `find` `findOne`, If you need more, select what you want and save!
	- Go to the `http://localhost/strapi/api/articles`

## Security for Endpoints
Secure all your Strapi related endpoints in Nginx, make sure to use API tokens to connect to the backend and keep this information private. The Nginx config that on the repo is for development, not production ⛔️

## Contributing

We are always welcome for contributions to help shape this package.

If interested please feel free to email the maintainer Burak at: hello@buraste.com

## Authors

- Ilya Shlyakhovoy:
	- Github: [@bgrusnak](https://github.com/bgrusnak)
    - Telegram: [@bgrusnak](https://t.me/bgrusnak)

## Thanks to original idea
- Burak Ibis:
	- Github: [@buraste](https://github.com/buraste)
	- Twitter: [@helloburaste](https://twitter.com/helloburaste)

## License

See the [LICENSE](./LICENSE.md) file for licensing information.
