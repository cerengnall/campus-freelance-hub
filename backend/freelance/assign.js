/**
 * Assign flow (dummy/in-memory): başvuru → kabul → atama
 *
 * Not:
 * - Store ve helper'lar `tasks.js` içinde tutulur ve burada import edilir.
 * - Bu dosya yalnızca Express Router export eder.
 */

const express = require("express");
const tasksModule = require("./tasks");

const { store, getTaskOrNull, jsonError, asString, nowIso, makeId } = tasksModule;

const router = express.Router();

// ---- Başvuru (apply) ----
router.post("/tasks/:taskId/apply", (req, res) => {
  const task = getTaskOrNull(req.params.taskId);
  if (!task) return jsonError(res, 404, "Task not found");
  if (task.status !== "open") {
    return jsonError(res, 409, "Task is not open for applications", { status: task.status });
  }

  const userId = asString(req.body?.userId);
  const message = asString(req.body?.message) ?? null;
  if (!userId) return jsonError(res, 400, "userId is required");

  const existing = task.applications.find((a) => a.userId === userId);
  if (existing) {
    return jsonError(res, 409, "User already applied", { applicationId: existing.id });
  }

  const application = {
    id: makeId("app"),
    userId,
    message,
    status: "pending", // pending | accepted | rejected
    createdAt: nowIso(),
  };

  task.applications.push(application);
  return res.status(201).json({ ok: true, application });
});

// ---- Kabul (accept) ----
router.post("/tasks/:taskId/applications/:applicationId/accept", (req, res) => {
  const task = getTaskOrNull(req.params.taskId);
  if (!task) return jsonError(res, 404, "Task not found");

  if (task.acceptedApplicationId) {
    return jsonError(res, 409, "Task already has an accepted application", {
      acceptedApplicationId: task.acceptedApplicationId,
    });
  }

  const app = task.applications.find((a) => a.id === req.params.applicationId);
  if (!app) return jsonError(res, 404, "Application not found");
  if (app.status !== "pending") {
    return jsonError(res, 409, "Application is not pending", { status: app.status });
  }

  for (const a of task.applications) {
    if (a.id === app.id) a.status = "accepted";
    else if (a.status === "pending") a.status = "rejected";
  }

  task.acceptedApplicationId = app.id;
  task.status = "accepted";

  return res.json({ ok: true, taskId: task.id, acceptedApplication: app });
});

// ---- Atama (assign) ----
router.post("/tasks/:taskId/assign", (req, res) => {
  const task = getTaskOrNull(req.params.taskId);
  if (!task) return jsonError(res, 404, "Task not found");

  if (!task.acceptedApplicationId) {
    return jsonError(res, 409, "Task must have an accepted application before assignment");
  }

  const freelancerId = asString(req.body?.freelancerId);
  if (!freelancerId) return jsonError(res, 400, "freelancerId is required");

  const accepted = task.applications.find((a) => a.id === task.acceptedApplicationId) || null;
  if (!accepted) {
    return jsonError(res, 409, "Accepted application missing", {
      acceptedApplicationId: task.acceptedApplicationId,
    });
  }

  if (freelancerId !== accepted.userId) {
    return jsonError(res, 409, "freelancerId must match accepted applicant userId", {
      freelancerId,
      acceptedApplicantUserId: accepted.userId,
    });
  }

  task.assignedTo = freelancerId;
  task.assignedAt = nowIso();
  task.status = "assigned";

  return res.json({
    ok: true,
    assignment: { taskId: task.id, freelancerId: task.assignedTo, assignedAt: task.assignedAt },
    task,
  });
});

module.exports = router;
module.exports.store = store;