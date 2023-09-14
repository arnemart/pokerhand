import { Dispatch, useCallback, useState } from "preact/hooks"

export type AsyncReducer<S, A> = (prevState: S, action: A) => Promise<S>

const useAsyncReducer = <S, A>(reducer: AsyncReducer<S, A>, initialState: S): [S, Dispatch<A>] => {
  const [state, setState] = useState(initialState)

  const dispatch = useCallback(
    async (action: A) => {
      const newState = await reducer(state, action)
      setState(newState)
    },
    [reducer, initialState]
  )

  return [state, dispatch]
}

export default useAsyncReducer
