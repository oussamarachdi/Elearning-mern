const router = require("express").Router();
const auth = require("../middleware/auth");
const Review = require("../models/Review");

router.post("/:courseId", auth, async(req,res)=>{
  const review = await Review.create({
    course: req.params.courseId,
    user: req.user.id,
    rating: req.body.rating,
    comment: req.body.comment
  });
  res.json(review);
});

router.get("/:courseId", async(req,res)=>{
  const reviews = await Review.find({course:req.params.courseId})
    .populate("user","name");
  res.json(reviews);
});

router.put("/:id", auth, async(req,res)=>{
  const r = await Review.findByIdAndUpdate(req.params.id, req.body,{new:true});
  res.json(r);
});

router.delete("/:id", auth, async(req,res)=>{
  await Review.findByIdAndDelete(req.params.id);
  res.json({message:"Review deleted"});
});

module.exports = router;
