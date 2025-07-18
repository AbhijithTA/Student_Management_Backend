import User from "../models/User.js";
import bcrypt from "bcryptjs";
import StaffPermissions from "../models/StaffPermissions.js";

export const createStaff = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const staff = await User.create({
      name,
      email,
      password: hashed,
      role: "staff",
    });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};


export const getAllStaff = async (req, res) => {
  const staffList = await User.find({ role: "staff" });
  const staffWithPermissions = await Promise.all(
    staffList.map(async (staff) => {
      const permission = await StaffPermissions.findOne({ staffId: staff._id });
      return {
        ...staff.toObject(),
        permissions: permission || {}, 
      };
    })
  );

  res.json(staffWithPermissions);
};


export const updateStaff = async (req, res) => {
  try {
    const staff = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const assignPermissions = async (req, res) => {
  const { staffId } = req.params;
  const { create, view, edit, del } = req.body;
  // console.log(staffId, create, view, edit, del);
  console.log(req.body);
  try {
    const permission = await StaffPermissions.findOneAndUpdate(
      { staffId },
      { create, view, edit, del },
      { new: true, upsert: true }
    );
    res.json({ message: "Permissions Updated", permission });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};
