import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import StaffPermissions from "../models/StaffPermissions.js"

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
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid credentials" });

    let permissions = {};
    if (user.role === 'staff') {
      const staffPermissions = await StaffPermissions.findOne({ staffId: user._id });
      permissions = staffPermissions ? staffPermissions.toObject() : {
        create: false,
        view: false,
        edit: false,
        delete: false
      };
    } else if (user.role === 'admin') {
      permissions = {
        studentCreate: true,
        studentView: true,
        studentEdit: true,
        studentDelete: true
      };
    }

    const userWithPermissions = {
      ...user.toObject(),
      permissions
    };

    res.json({ 
      user: userWithPermissions, 
      token: generateToken(userWithPermissions) 
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occurred in the controller", err);
  }
};