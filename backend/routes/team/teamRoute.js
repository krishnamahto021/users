const express = require("express");
const teamController = require("../../controllers/teamController");
const router = express.Router();

router.post("/create", teamController.createTeam);
router.get("/:id", teamController.fetchTeamDetails);
module.exports = router;
