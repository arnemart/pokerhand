import { Classification } from "../shared/cards"
import Card from "./card"

const Hand = ({ hand, won }: { hand: Classification; won: boolean }) => (
  <div
    class={`${won ? "bg-green-200" : "bg-gray-100"}
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
