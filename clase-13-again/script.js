// import bcrypt from "bcryptjs";

// const password = "mysecretpassword";

// // Hash the password
// const hash = await bcrypt.hash(password, 10);

// console.log("Hashed password:", hash);

import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

console.log(token);
