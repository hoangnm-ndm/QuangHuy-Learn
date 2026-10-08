import React from "react";

const Child = ({ count, handleClick }) => {
  /** Không bao giờ cố gắng thay đổi props */
  console.log("component con re-render");

  return (
    <>
      <button onClick={handleClick}>Increment</button>
      <div>{count}</div>
    </>
  );
};

export default Child;
