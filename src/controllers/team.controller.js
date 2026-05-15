const Team = require("../models/Team");

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: [{ user: req.user.id, role: "ADMIN" }],
    });

    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({
      "members.user": req.user.id,
    }).populate("members.user", "name email");

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Member
exports.addMember = async (req, res) => {
  try {
    const { userId, role } = req.body;

    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ message: "Team not found" });

    team.members.push({
      user: userId,
      role: role || "MEMBER",
    });

    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};