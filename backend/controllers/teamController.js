const Team = require("../models/teamModel");
module.exports.createTeam = async (req, res) => {
  const { name, userIds } = req.body;

  try {
    // Validate if userIds array is provided and not empty
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User IDs array is required and must not be empty",
      });
    }

    // Create a new team with the provided team name and user IDs
    const newTeam = await Team.create({
      name,
      users: userIds,
    });

    res.status(201).json({
      success: true,
      team: newTeam,
      message: "Team created successfully",
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ success: false, message: "Failed to create team" });
  }
};

module.exports.fetchTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id).populate({
      path: "users",
      select: "first_name last_name email domain avatar",
    });

    if (!team) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, team });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch team details" });
  }
};

module.exports.fetchTeamDetails = async (req, res) => {
  try {
    const teams = await Team.find({}).sort({ createdAt: -1 }).populate({
      path: "users",
      select: "first_name last_name email domain avatar",
    });

    if (!teams) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found" });
    }

    res.status(200).json({ success: true, teams });
  } catch (error) {
    console.error("Error fetching team details:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch team details" });
  }
};
