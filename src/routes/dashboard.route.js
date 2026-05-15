const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const Task = require("../models/Task");

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { assignedTo: req.user.id },
        { createdBy: req.user.id },
      ],
    });

    const now = new Date();

    res.json({
      total: tasks.length,
      completed: tasks.filter(t => t.status === "completed").length,
      pending: tasks.filter(t => t.status === "pending").length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < now).length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;