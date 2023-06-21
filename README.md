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

`docker-compose up -d` or

`docker-compose up -d` in detached mode

To remove all the containers and the volumes in a docker-compose file, run:

`docker-compose down -v`
