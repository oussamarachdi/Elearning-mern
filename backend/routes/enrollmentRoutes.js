const router = require("express").Router();
const auth = require("../middleware/auth");
const Enrollment = require("../models/Enrollment");

router.post("/enroll/:courseId", auth, async(req,res)=>{
  try {
    const enroll = await Enrollment.create({
      student: req.user.id,
      course: req.params.courseId
    });
    res.json(enroll);
  } catch(err){
    res.status(400).json({message: "Already enrolled"});
  }
});

router.get("/my-courses", auth, async(req,res)=>{
  const data = await Enrollment.find({ student: req.user.id })
    .populate("course");
  res.json(data);
});

router.delete("/:courseId", auth, async(req,res)=>{
  await Enrollment.findOneAndDelete({
    student:req.user.id,
    course:req.params.courseId
  });
  res.json({message:"Enrollment cancelled"});
});

router.get("/", async(req,res)=>{
  const all = await Enrollment.find().populate("student").populate("course");
  res.json(all);
});


module.exports = router;
