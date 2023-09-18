import { Dispatch, useCallback, useState } from "preact/hooks"

export type AsyncReducerState<S> = S & { loading: boolean }
export type AsyncReducer<S, A> = (prevState: S, action: A) => Promise<S>

const useAsyncReducer = <S, A>(
  reducer: AsyncReducer<S, A>,
  initialState: S
): [AsyncReducerState<S>, Dispatch<A>] => {
  const [state, setState] = useState({ ...initialState, loading: false })

  const dispatch = useCallback(
    async (action: A) => {
      setState({ ...state, loading: true })
      const newState = await reducer(state, action)
      setState({ ...newState, loading: false })
    },
    [reducer, initialState]
  )

  return [state, dispatch]
}

export default useAsyncReducer
