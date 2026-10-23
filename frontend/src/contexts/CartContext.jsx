import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const initCart = JSON.parse(localStorage.getItem("cart" || "{}")) ?? {
    items: [],
    userId: "123",
    total: 0,
  };
  const [cart, setCart] = useState(initCart);

  const calcTotal = (items) =>
    items.reduce((accumulator, currentItem, indexItem, array) => {
      accumulator += currentItem.price * currentItem.quantity;
      return accumulator;
    }, 0);

  const addToCart = (product) => {
    const checkProductExistCart = cart.items.find(
      (item) => item._id === product._id,
    );
    const newCartItems = checkProductExistCart
      ? cart.items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...cart.items, { ...product, quantity: 1 }];
    setCart((prev) => ({
      ...prev,
      items: newCartItems,
      total: calcTotal(newCartItems),
    }));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  /**
   * * Lưu ý quantity không vượt quá stock và không âm.
   */
  const removeCart = (item) => {};
  const updateQuantity = (item, quantity) => {};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
