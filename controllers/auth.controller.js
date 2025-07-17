import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, email, password: hashed, role });
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user)))
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({ user, token: generateToken(user) });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};
