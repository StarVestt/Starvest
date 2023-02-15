const express = require("express");
const { createProfile, loginProfile, getProfile, deleteProfile } = require("../controllers/profileController");
const authHandler = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", createProfile);

router.post("/login", loginProfile);

router.get("/me", authHandler, getProfile);

router.delete("/delete", authHandler, deleteProfile);

module.exports = router