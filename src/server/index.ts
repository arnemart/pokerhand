import Fastify from "fastify"
import FastifyVite from "@fastify/vite"
import FastifyCookie from "@fastify/cookie"
import FastifySession from "@fastify/session"
import RedisStore from "connect-redis"
import { createClient } from "redis"

import api from "./api"
import { shuffledDeck } from "../shared/cards"

const server = Fastify({
  logger: true
})

await server.register(FastifyVite, {
  dev: process.env["NODE_ENV"] == "development",
  root: process.cwd(),
  spa: true
})

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379"
})
redisClient.on("error", (err) => server.log.error("Redis Client Error", err))
await redisClient.connect()

const redisStore = new RedisStore({
  client: redisClient
})

await server.register(FastifyCookie)
await server.register(FastifySession, {
  secret: "oolie7FeoodiuCh9ieR6ohPhja6leeZ1UavahRo8Thai4obauD7yoh9lmo0Chox0",
  store: redisStore,
  cookie: {
    secure: false
  }
})

server.addHook("preHandler", (request, _reply, next) => {
  if (request.session.get("deck") == null || request.session.get("hands") == null) {
    request.session.set("deck", shuffledDeck())
    request.session.set("hands", [])
  }
  next()
})

await server.register(api, { prefix: "/api" })

server.get("/", (_request, reply) => reply.html())

try {
  await server.vite.ready()
  await server.listen({ host: "::", port: 3000 })
} catch (err) {
  server.log.error(err)
  process.exit(1)
}
