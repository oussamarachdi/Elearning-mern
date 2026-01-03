let refreshTokens = [];
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateTokens = (user)=>{
  const accessToken = jwt.sign(
    { id:user._id, role:user.role },
    process.env.JWT_SECRET,
    { expiresIn:"1h" }
  );

  const refreshToken = jwt.sign(
    { id:user._id },
    process.env.JWT_REFRESH,
    { expiresIn:"7d" }
  );

  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};

exports.register = async(req,res)=>{
  const {name,email,password,role} = req.body;

  const exist = await User.findOne({email});
  if(exist) return res.status(400).json({message:"Email already exists"});

  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({name,email,password:hashed,role});

  res.json(user);
};

exports.login = async(req,res)=>{
  const {email,password} = req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(404).json({message:"User not found"});

  const match = await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({message:"Wrong password"});

  const tokens = generateTokens(user);
  res.json({ user, ...tokens });
};

exports.logout = async(req,res)=>{
  const token = req.body.refreshToken;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({message:"Logged out"});
};

exports.refreshToken = (req,res)=>{
  const token = req.body.refreshToken;
  if(!token || !refreshTokens.includes(token))
    return res.status(401).json({message:"Invalid refresh token"});

  jwt.verify(token, process.env.JWT_REFRESH, (err,user)=>{
    if(err) return res.status(403).json({message:"Token expired"});
    const accessToken = jwt.sign(
      { id:user.id },
      process.env.JWT_SECRET,
      {expiresIn:"1h"}
    );
    res.json({accessToken});
  });
};
