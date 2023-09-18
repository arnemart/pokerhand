import { FastifyInstance, FastifyPluginOptions } from "fastify"
import { Classification, Hand, classify, orderHands, shuffledDeck } from "../shared/cards"

export default (
  server: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: (err?: Error) => void
) => {
  server.get("/status", async (request, reply) => {
    reply.send({
      deck: request.session.get("deck").length,
      hands: request.session.get("hands")
    })
    return reply
  })

  server.post("/shuffle", async (request, reply) => {
    request.session.set("deck", shuffledDeck())
    request.session.set("hands", [])

    reply.send({
      deck: 52,
      hands: []
    })
    return reply
  })

  server.post("/draw", async (request, reply) => {
    const deck = request.session.get("deck")
    const hands = request.session.get("hands")

    if (deck.length >= 5) {
      const hand = classify(deck.slice(0, 5) as Hand)
      const newDeck = deck.slice(5)
      const newHands = [hand, ...hands]
      request.session.set("deck", newDeck)
      request.session.set("hands", newHands)
      reply.send({
        deck: newDeck.length,
        hands: newHands
      })
    } else {
      reply.status(400).send({ error: "Not enough cards in deck" })
    }
    return reply
  })

  server.post("/order", async (request, reply) => {
    try {
      const orderedHands = orderHands((request.body as { hands: Classification[] }).hands)
      reply.send({ hands: orderedHands })
    } catch (e) {
      reply.status(400).send({ error: "Error parsing hands" })
    }
    return reply
  })

  done()
}
