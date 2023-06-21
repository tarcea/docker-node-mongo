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

### Ad ENV to your project

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
