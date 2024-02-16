const router = require("express").Router();
const { signup, getBills } = require("../Controllers/appController.js");

// http req
router.post("/user/signup", signup);
router.post("/product/getBills", getBills);

module.exports = router;
