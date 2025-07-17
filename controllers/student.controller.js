import Student from "../models/Student.js";

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  try {
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log("Error occured in the controller", err);
  }
};
