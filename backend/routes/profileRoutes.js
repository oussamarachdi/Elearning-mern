const router = require("express").Router();
const auth = require("../middleware/auth");
const Profile = require("../models/Profile");

router.post("/", auth, async(req,res)=>{
  const profile = await Profile.create({ user:req.user.id, ...req.body });
  res.json(profile);
});

router.get("/me", auth, async(req,res)=>{
  const profile = await Profile.findOne({ user:req.user.id });
  res.json(profile);
});

router.put("/:id", auth, async(req,res)=>{
  const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.json(profile);
});

router.delete("/:id", auth, async(req,res)=>{
  await Profile.findByIdAndDelete(req.params.id);
  res.json({message:"Profile deleted"});
});

module.exports = router;
