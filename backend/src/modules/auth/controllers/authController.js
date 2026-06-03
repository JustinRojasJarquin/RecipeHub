import {
  registerUser,
  loginUser
} from "../services/authService.js";

import {
  generateToken
} from "../../../utils/jwt.js";

export const register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const user =
      await registerUser(
        name,
        email,
        password
      );

    res.status(201).json({
      message:
        "Usuario registrado correctamente",
      user
    });
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

export const login = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await loginUser(
        email,
        password
      );

    const token =
      generateToken(user._id);

    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    res.status(401).json({
      message: error.message
    });
  }
};

export const getProfile = async (
  req,
  res
) => {
  res.status(200).json(req.user);
};