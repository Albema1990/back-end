import bcrypt from "bcryptjs";

const password = "mysecretpassword";

// Hash the password
const hash = await bcrypt.hash(password, 10);

console.log("Hashed password:", hash);