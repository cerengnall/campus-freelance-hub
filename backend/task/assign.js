/**
 * Tasks API (dummy/in-memory) + başvuru → kabul → atama zinciri
 *
 * Kurallar:
 * - DB yok: in-memory dummy store
 * - Sadece bu dosya: Express Router export eder
 */

const express = require("express");

function nowIso() {
  return new Date().toISOString();
}

function makeId(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function asString(x) {
  if (typeof x !== "string") return null;
  const s = x.trim();
  return s.length ? s : null;
}

function jsonError(res, status, message, details) {
  return res.status(status).json({
    ok: false,
    error: {
      message,
      details: details ?? null,
    },
  });
}

// Dummy store (process memory)
const store = {
  tasks: [
    {
      id: "task_1",
      title: "Landing page düzenleme",
      description: "Mevcut landing sayfasında UI iyileştirmeleri",
      status: "open", // open | accepted | assigned
      createdAt: nowIso(),
      applications: [],
      acceptedApplicationId: null,
      assignedTo: null,
      assignedAt: null,
    },
  ],
};

function getTaskOrNull(taskId) {
  return store.tasks.find((t) => t.id === taskId) || null;
}

const router = express.Router();

// ---- Tasks ----
router.get("/tasks", (req, res) => {
  const items = store.tasks.map((t) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    status: t.status,
    createdAt: t.createdAt,
    applicationsCount: t.applications.length,
    acceptedApplicationId: t.acceptedApplicationId,
    assignedTo: t.assignedTo,
    assignedAt: t.assignedAt,
  }));
  return res.json({ ok: true, items });
});

router.get("/tasks/:taskId", (req, res) => {
  const task = getTaskOrNull(req.params.taskId);
  if (!task) return jsonError(res, 404, "Task not found");
  return res.json({ ok: true, task });
});

router.post("/tasks", (req, res) => {
  const title = asString(req.body?.title);
  const description = asString(req.body?.description) ?? "";
  if (!title) return jsonError(res, 400, "title is required");

  const task = {
    id: makeId("task"),
    title,
    description,
    status: "open",
    createdAt: nowIso(),
    applications: [],
    acceptedApplicationId: null,
    assignedTo: null,
    assignedAt: null,
  };

  store.tasks.unshift(task);
  return res.status(201).json({ ok: true, task });
});

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

  // Zincir kuralı: atama, kabul edilen başvuran kullanıcıya yapılır
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
