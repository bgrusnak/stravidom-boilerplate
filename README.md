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
    - [Telegram user ID](#telegram-user-id)
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
- Make a certificates (you may need install mkcert first): 
```
cd cert && mkcert 127.0.0.1 && cd ..
```
- Change credentials with secure and strong ones
- If you are on development, be sure `ENVIRONMENT=development` on .env file
- If you are on production or want to production build, change with `ENVIRONMENT=production`
- Be sure `127.0.0.1:HTTPS_PORT` is accesible and not using from another process (Nginx runs on the port provided in the .env file as HTTPS_PORT)
- Pull necessary images:
```bash
docker-compose pull
```
- Build your docker-compose:
```bash
docker-compose build 
```
#### Usage
- Up your docker-compose file if everything is ok:
```bash
 docker-compose up -d
```
- Now you can access to Vue frontend on `http://127.0.0.1:HTTPS_PORT` and Strapi backend (admin) on `http://127.0.0.1:HTTP_PORT/admin`
- First you need to create an admin on page `http://127.0.0.1:HTTPS_PORT/admin/auth/register-admin`
- Register with your e-mail and password.
- Go to `Content-Type Builder`, It has sample content type as `Article` and this content type has three field as `title` `body` and `cover`.
- For creating new `Article`, go to `Content Manager`and click `Article`on left pane, click `Create new entry`and fill the blanks > click Publish!
- For testing API endpoint you need to give public access to the `Article` so
	- Go to `Settings`>`User & Permissions Plugin`>`Roles`>`Public`>`Article`and select `find` `findOne`, If you need more, select what you want and save!
	- Go to the `http://127.0.0.1/strapi/api/articles`
- If you have the problem with "tgauth//agree" route, regenerate the router permissions.
### Telegram user ID
- Open your bot and run the application
- Application will register the new record in the collection Telegram user.
- Open your record, there you will see your telegram_id
- add it to the .env file as one of the ADMINS

## Security for Endpoints
The Nginx protects all endpoints with SSL certificate, you need to issue the correct certificates and 
* add the certificate to the *cert* folder
* fix the config/nginx/default.conf to use the new certificates and site name.

## Contributing

We are always welcome for contributions to help shape this package.

If interested please feel free to email the maintainer Ilya Shlyakhovoy at: bulgarus@inbox.ru

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
