import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count += 1;
      // * reduxtoolkit đã có 1 lớp xử lý trung gian để cho phép lập trình viên thay đổi trực tiếp state mà không bị lỗi
    },
    decrement(state) {
      state.count -= 1;
    },
    decrementByPayload(state, action) {
      state.count = state.count + action.payload;
    },
    reset(state) {
      state.count = 0;
    },
  },
});
export const { increment, decrement, reset } = counterSlice.actions;

const counterReducer = counterSlice.reducer;

export default counterReducer;
