import { Classification } from "../shared/cards"
import Card from "./card"

type HandProps = {
  hand: Classification
  won: boolean
}

const Hand = ({ hand, won }: HandProps) => (
  <div
    class={`${won ? "bg-green-200 hover:bg-green-300" : "bg-gray-100 hover:bg-gray-200"}
      transition-all
      p-4 rounded`}
  >
    <div class="flex gap-2">
      {hand.hand.map((card) => (
        <Card name={card} />
      ))}
    </div>
    {hand.rank}
  </div>
)

export default Hand
