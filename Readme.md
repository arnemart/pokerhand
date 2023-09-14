# Pokerhand

Small sample application to draw, classify and rank poker hands.

The application uses:

- Docker
- Typescript
- Fastify as the web server framework
- Redis for session storage
- Vite as the frontend build system
- Preact as the frontend framework
- Tailwind for css

To build and run the docker image, run the following commands:

```
$ scripts/docker_build
$ scripts/docker_start
```

This compiles the frontend sources and builds the docker image, and then starts the application and a redis server in two separate docker containers.

The application runs on <http://localhost:3000>

To run the development server, which has live reloading of the frontend, use `npm run dev`. You will also need a redis server for this, for that you can use the script in `scripts/docker_redis_dev` or run a local redis server however you want.
