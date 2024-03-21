const express = require("express");
const router = express.Router();

router.use("/users", require("./user/userRoute"));
router.use("/team", require("./team/teamRoute"));

module.exports = router;
