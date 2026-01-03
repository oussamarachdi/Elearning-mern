const Course = require("../models/Course");

// Create course (Instructor only in theory)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, lessons, youtubeUrl } = req.body;

    const course = await Course.create({
      title,
      description,
      youtubeUrl,
      lessons: lessons || [],
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    console.error("CreateCourse error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    console.error("GetCourses error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "name email"
    );
    if (!course) return res.status(404).json({ message: "Not found" });
    res.json(course);
  } catch (err) {
    console.error("GetCourseById error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!course) return res.status(404).json({ message: "Not found" });
    res.json(course);
  } catch (err) {
    console.error("UpdateCourse error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("DeleteCourse error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
