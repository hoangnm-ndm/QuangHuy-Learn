import React from "react";
import { useStore } from "../../store/cartStore";

const Counter = () => {
  const { count, increment, decrement } = useStore();
  console.log({ count, increment, decrement });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

export default Counter;
