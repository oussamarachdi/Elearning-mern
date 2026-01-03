const router = require("express").Router();
const { body } = require("express-validator");
const validate = require("../middleware/validate");
const auth = require("../middleware/auth");

const { register, login, logout, refreshToken } =
  require("../controllers/authController");

router.post(
 "/register",
 [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({min:6})
 ],
 validate,
 register
);

router.post(
 "/login",
 [
  body("email").isEmail(),
  body("password").notEmpty()
 ],
 validate,
 login
);

router.post("/logout", auth, logout);
router.post("/refresh", refreshToken);

module.exports = router;
