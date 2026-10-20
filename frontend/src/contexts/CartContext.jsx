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
    }, 0);
  const addToCart = (product) => {
    //* neu san pham nay da co trong gio hang thi can tang so luong thay vi tao 1 ban ghi moi
    const checkProductExistCart = cart.items.find(
      (item) => item._id === product._id,
    );

    // ? sai

    console.log(checkProductExistCart);
    if (checkProductExistCart) {
      setCart((prev) => ({
        ...prev,
        items: cart.items.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        total: calcTotal(prev.items),
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        items: [...cart.items, { ...product, quantity: 1 }],
        total: calcTotal(prev.items),
      }));
    }
  };

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
