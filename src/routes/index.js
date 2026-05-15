const router = require("express").Router();

const authRoutes = require("./auth.route");
const teamRoutes = require("./team.route");
const projectRoutes = require("./project.route");
const taskRoutes = require("./task.route");
const dashboardRoutes = require("./dashboard.route");

// Routes
router.use("/auth", authRoutes);
router.use("/teams", teamRoutes);
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;