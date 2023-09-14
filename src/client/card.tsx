type CardProps = {
  name: string
  offset?: number
}

const suits = {
  h: "♥️",
  r: "♦️",
  s: "♠️",
  k: "♣️"
}

const n = (num: string) => (num == "t" ? "10" : num.toUpperCase())

export default ({ name, offset }: CardProps) => {
  const [suit, num] = name.split("")
  const color = suit == "h" || suit == "r" ? "red" : "black"

  return (
    <div
      class={`
        ${color == "red" ? "text-red-700" : "text-black"}
        p-2 w-16 h-20
        border border-black rounded bg-white
        grid place-content-center`}
      style={offset == null ? {} : { position: "absolute", top: 0, left: offset }}
    >
      {name == "blank" ? (
        <span>
          ♥️♣️ <br /> ♠️♦️
        </span>
      ) : (
        `${suits[suit]} ${n(num)}`
      )}
    </div>
  )
}
