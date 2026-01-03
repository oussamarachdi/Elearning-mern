const router = require("express").Router();
const auth = require("../middleware/auth");
const { generateCourseDescription } = require("../controllers/aiController");

router.post("/generate-description", auth, generateCourseDescription);

module.exports = router;
