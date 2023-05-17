# Docker, TypeScript, Node.js

## Preconditions:
- TS application listening port: 8000
- [Node installed](https://nodejs.org/en/download)
- [Docker installed](https://www.docker.com/products/docker-desktop/)

```
|-- dist
|-- src
|-- .dockerignore
|-- Dockerfile
|-- package.json
|-- package-lock.json
`-- tsconfig.json
```

`package.json` scripts
```
"scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
},
```

## Dockerfile

```
FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000
CMD [ "node", "dist/index.js" ]
```

## Docker commands

### Images

Build docker image
```
docker build -t hello-world .
```

Run image in interactive mode
```
docker run -it -p 8000:8000 hello-world
```

Or run image in silent(daemon) mode
```
docker run -d -p 8000:8000 hello-world
```
List all images
```
docker image ls
```

Remove all images at once
```
docker rmi $(docker images -q)
```

### Containers

List all active containers
```
docker ps
```

List all active and dead containers
```
docker ps -a
```

Stop all running containers
```
docker stop $(docker ps -a -q)
```

Delete all stopped containers: 
```
docker rm $(docker ps -a -q)
```

### Other

Install help utils
```
apt-get install iputils-ping nmap
```

Jump into container shell
```
docker exec -it CONTAINER_ID /bin/sh
```