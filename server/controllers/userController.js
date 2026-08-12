const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// GET /api/users/profile (protected)
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(user);
});
