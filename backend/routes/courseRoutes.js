const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

// Public: get all courses
router.get("/", getCourses);

// Public: get single course
router.get("/:id", getCourseById);

// Protected: create/update/delete course
router.post("/", auth, createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

module.exports = router;
