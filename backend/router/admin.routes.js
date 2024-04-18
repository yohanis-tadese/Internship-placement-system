const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller");
const multer = require("multer");

// Initialize Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/backend/upload/Admin");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Define Upload Route
router.post(
  "/api/admin/upload",
  upload.single("photo"),
  adminController.uploadPhoto
);

// Other Routes
router.post("/api/admin", adminController.createAdmin);
router.get("/api/admin", adminController.getAllAdmins);

module.exports = router;
