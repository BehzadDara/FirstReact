import { useReducer } from "react";

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action");
  }
}

export function useCounter(initialValue: number = 0) {
  const [state, dispatch] = useReducer(counterReducer, { count: initialValue });

  const increment = () => dispatch({ type: "increment" });
  const decrement = () => dispatch({ type: "decrement" });
  const reset = () => dispatch({ type: "reset" });

  return {
    count: state.count,
    increment,
    decrement,
    reset,
  };
}
