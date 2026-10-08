import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);
export const hashPassword = (password) => bcrypt.hashSync(password, salt);
export const comparePassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);
