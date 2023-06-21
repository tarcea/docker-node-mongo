# Template containerized project node-express-mongo

To build a new image using a `Dockerfile`, run the folowing command in the directory where that `Dockerfile` is:

`docker build -t GIVE_A_NAME_TO_THE_IMAGE .`

`docker build -t tarcea/node-mongo-template .`

To see your images in docker:

`docker images` or `docker image ls`

To start a container from a certain image:

`docker run -p outsideContainerPort:insideContainerPort -d --name GIVE_A_NAME_TO_THE_CONTAINER NAME_OF_TEH_IMAGE`

`docker run -p 3001:3001 -d --name node-server tarcea/node-mongo-template`

Create `docker-compose.yml`

To start all the containers and the volumes in a docker-compose file, run:

`docker-compose up` or

`docker-compose up -d` in detached mode

To remove all the containers and the volumes in a docker-compose file, run:

`docker-compose down -v`

### Add ENV to your project

We need to define `NODE_ENV` variable as 'development', 'production' or 'test'

and based on that value to change the 'RUN' in `Dockerfile`

If `NODE_ENV=development` `RUN npm install`
If `NODE_ENV=production` `RUN npm install --only=production`

In production we don't need to install `devDependencies`

# DEVELOPMENT

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d`

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml down` if you use `-v` flag when down the containers, all the volumes will be also deleted, including eventually your database!!!!

So, take care when use that flag!!!!

Instead, you can 'up' your containers and then use `docker volume prune` to clean all unused volumes!!!!

# PRODUCTION

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

`docker-compose -f docker-compose.yml -f docker-compose.prod.yml down`

### Add mongo

Add the service in `docker-compose.yml` and call it 'mongo'

```yml
mongo:
  image: mongo
  environment:
    MONGO_INITDB_ROOT_USERNAME: root
    MONGO_INITDB_ROOT_PASSWORD: example
  volumes:
    - mongo-db:/data/db
volumes:
  mongo-db:
```

- we use an external docker image: mongo
- we set the database username and password as environment variables
- we build a volume to persist our database over the container dropping
- for the previous volume to work we have to declare a general volume (like in the last line of the above snippet)

### Add mongo connection

- add the code in `index.js`
- update environment in `docker-compose.dev.yml`

```yaml
environment:
  - NODE_ENV=development
  - MONGO_USER=root
  - MONGO_PASSWORD=example
```

- update server service in `docker-compose.yml`

```yaml
depends_on:
  - mongo
```

- ljhohroihgri
