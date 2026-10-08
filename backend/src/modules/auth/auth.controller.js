import jwt from "jsonwebtoken";
import { envConfig } from "../../config/env.config.js";
import { comparePassword, hashPassword } from "../../shared/utils/password.js";
import { User } from "../user/user.model.js";
import { authService } from "./auth.service.js";
import { signAccessToken, signRefreshToken } from "../../shared/utils/jwt.js";

export const authController = {
  register: async (req, res) => {
    const { email, password } = req.body;
    /**
     * * validation
     * * hash password
     * * check email exist
     * * tao new user
     */
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = hashPassword(password);

    const newUser = await authService.register({
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  },

  verifyEmail: async (req, res) => {
    /**
     * * send maild for email (token - expired 24h)
     */
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const isMatch = comparePassword(password, userExist.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const accessToken = signAccessToken(userExist._id);
    const refreshToken = signRefreshToken(userExist._id);

    userExist.password = undefined;

    res.status(200).json({
      message: "Login successfully",
      user: userExist,
      accessToken,
      refreshToken,
    });
  },

  refreshToken: async (req, res) => {},
  logout: async (req, res) => {},

  loginWithGoogle: async (req, res) => {},
};
