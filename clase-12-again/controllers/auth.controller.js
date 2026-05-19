import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
     email,
     password: hash,
 });

  res.status(201).json({
    id: user.id,
    email: user.email,
  });
};
