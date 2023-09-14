import { Classification } from "./src/shared/cards"

declare module "fastify" {
  interface FastifyReply {
    html: () => string
  }

  interface FastifyInstance {
    vite: {
      ready: () => Promise<Boolean>
    }
  }

  interface Session {
    deck: string[]
    hands: Classification[]
  }
}
