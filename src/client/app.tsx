import { useEffect } from "preact/hooks"
import Card from "./card"
import useAsyncReducer from "./useAsyncReducer"
import { gameReducer, initGame } from "./game"
import Btn from "./btn"
import Hand from "./hand"

export default () => {
  const [state, dispatch] = useAsyncReducer(gameReducer, initGame())

  useEffect(() => {
    dispatch("status")
  }, [])

  return (
    <main class="p-4 flex flex-col gap-4">
      <h1 class="text-2xl">Pokerhands</h1>

      <div class="relative h-20 my-4">
        {[...Array(state.deck)].map((_, i) => (
          <Card name="blank" offset={i * 4} />
        ))}
      </div>

      <div class="flex gap-4">
        <Btn onClick={() => dispatch("shuffle")}>Shuffle</Btn>
        <Btn onClick={() => dispatch("draw")}>Draw</Btn>
        <Btn onClick={() => dispatch("order")}>Rank hands</Btn>
      </div>

      {state.error && <div class="p-2 rounded bg-red-100 border border-red-600">{state.error}</div>}

      {state.hands.map((hand, i) => (
        <div>
          <Hand hand={hand} won={state.ordered && i == 0} />
        </div>
      ))}
    </main>
  )
}
