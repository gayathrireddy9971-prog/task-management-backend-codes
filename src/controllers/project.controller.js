const Project = require("../models/Project");

// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      members: req.body.members || [],
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Projects for logged-in user
exports.getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      members: req.user.id,
    }).populate("tasks");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};