// Import the required modules
const express = require("express")
const router = express.Router()

const { enrollCourses } = require("../controllers/Payments")
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")


router.post("/enrollCourses",auth, isStudent, enrollCourses);

module.exports = router