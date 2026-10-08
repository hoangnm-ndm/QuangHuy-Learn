import User from "../../models/user.model.js";

export const authService = {
  register: async (userData) => {
    const newUser = await User.create(userData);
    newUser.password = undefined;
    return newUser;
  },
  login: async (email, password) => {},
};
