import { JSX } from "preact/jsx-runtime"

const Btn = (props: JSX.HTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    class={`
      ${props.class}
      py-2 px-4
      border border-black rounded
      bg-gray-200
      hover:bg-gray-300
      transition-all`}
  />
)
export default Btn
