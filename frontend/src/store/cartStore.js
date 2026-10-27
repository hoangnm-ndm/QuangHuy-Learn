import { create } from "zustand";

const initCart = { items: [], total: 0, quantity: 0 };
export const cartStore = create((set) => ({
  cart: initCart,
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.items.find(
        (item) => item._id === product._id,
      );

      const items = existingItem
        ? state.cart.items.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...state.cart.items, { ...product, quantity: 1 }];

      const quantity = items.reduce((acc, cur) => (acc += cur.quantity), 0);
      const total = items.reduce(
        (acc, cur) => (acc += cur.price * cur.quantity),
        0,
      );

      return {
        cart: { items, total, quantity },
      };
    }),
  removeCart: () => {},
  resetCart: () =>
    set({
      cart: initCart,
    }),
}));
