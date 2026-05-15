const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

const {
  createTeam,
  getTeams,
  addMember,
} = require("../controllers/team.controller");

// Create team (ADMIN only)
router.post("/", auth, role(["ADMIN"]), createTeam);

// Get teams
router.get("/", auth, getTeams);

// Add member
router.post("/:teamId/add-member", auth, role(["ADMIN"]), addMember);

module.exports = router;