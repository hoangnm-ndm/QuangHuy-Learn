import React from "react";

const sizeOptions = {
  big: { padding: "24px 48px" },
  medium: { padding: "18px 32px" },
  small: { padding: "12px 16px" },
};

const Button = ({ children, size, color, onClick }) => {
  // * props = properties = các thuộc tính

  console.log({ children, size, color });
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, ...sizeOptions[size] }}
    >
      {children}
    </button>
  );
};

export default Button;
