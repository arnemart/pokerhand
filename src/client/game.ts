import { Classification } from "../shared/cards"

export type GameState = {
  deck: number
  hands: Classification[]
  ordered: boolean
  error: string
}

export type Action = "status" | "draw" | "shuffle" | "order"

export const initGame = (): GameState => ({
  deck: 0,
  hands: [],
  ordered: false,
  error: ""
})

export const gameReducer = async (state: GameState, action: Action): Promise<GameState> => {
  switch (action) {
    case "status":
    case "shuffle":
    case "draw":
      try {
        const response = await fetch(`/api/${action}`, {
          method: action == "status" ? "get" : "post"
        })
        const result = await response.json()

        if (Math.floor(response.status / 100) != 2) {
          return { ...state, error: result?.error || "An error has occurred", ordered: false }
        } else {
          return {
            deck: result.deck as number,
            hands: result.hands as Classification[],
            ordered: false,
            error: ""
          }
        }
      } catch (e) {
        return { ...state, error: "A network error has occurred", ordered: false }
      }

    case "order":
      try {
        const response = await fetch("/api/order", {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ hands: state.hands })
        })
        const result = await response.json()
        if (result && result.hands) {
          return { ...state, hands: result.hands, ordered: true }
        } else {
          return { ...state, error: result?.error || "An error has occurred", ordered: false }
        }
      } catch (e) {
        return { ...state, error: "A network error has occurred", ordered: false }
      }

    default:
      return state
  }
}
