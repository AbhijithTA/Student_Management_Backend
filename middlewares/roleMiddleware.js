const StaffPermissions = require("../models/StaffPermissions");

const allowedWithPermission = (action) => async (req, res, next) => {
  if (req.user.role === "superadmin") return next();

  const permission = await StaffPermissions.findOne({ staffId: req.user.id });
  if (permission && permission[action]) return next();
  return res
    .status(403)
    .json({ message: "You do not have permission to perform this action" });
};


module.exports = { allowedWithPermission };