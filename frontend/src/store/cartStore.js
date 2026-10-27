import { create } from "zustand";

export const cartStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),

  // cart: { items: [], total: 0, quantity: 0 },
  // addToCart: () => {},
  // removeCart: () => {},
  // resetCart: () => {},
}));
