import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Button from "../../components/Button";
import Child from "./Child";

const Layout = () => {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount((prev) => prev + 1);
  }
  // * count là state của component cha nhưng là props của component con, muốn thay đổi thì phải thay dổi từ phía cha
  console.log("component cha re-render");
  return (
    <>
      {/* <button onClick={handleClick}>Increment</button> */}
      <Child count={count} handleClick={handleClick} />
    </>
  );
};

export default Layout;
