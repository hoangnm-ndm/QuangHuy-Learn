import { createSlice } from "@reduxjs/toolkit";

const initCart = {
  items: [],
  total: 0,
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initCart,
  reducers: {
    addToCart(state, action) {
      const items = state.items.find((item) => item._id === action.payload._id)
        ? state.items.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : state.items.push({ ...action.payload, quantity: 1 });

      const quantity = items.reduce((acc, cur) => (acc += cur), 0);
      const total = items.reducer(
        (acc, cur) => (acc += cur.price * cur.quantity),
        0,
      );
      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const { addToCart } = cartSlice;

export default cartSlice.reducer;
