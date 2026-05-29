const express = require("express");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const router = express.Router();

router.get("/admin-only", authenticate, authorize(["ADMIN"]), (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
