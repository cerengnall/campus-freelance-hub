const express = require("express");

const router = express.Router();

const tasks = [];

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const { title, description, status, deadline } = req.body || {};

  const newTask = {
    id: tasks.length + 1,
    title: title || "Untitled Task",
    description: description || "",
    status: status || "pending",
    deadline: deadline || null
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

module.exports = {
  router,
  tasks
};
