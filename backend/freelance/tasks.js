/**
 * Tasks API (dummy/in-memory) — sadece task CRUD/listeleme
 *
 * Not:
 * - DB yok: in-memory dummy store
 * - Assign flow ayrı dosyada (`assign.js`)
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

module.exports = router;
module.exports.store = store;
module.exports.getTaskOrNull = getTaskOrNull;
module.exports.jsonError = jsonError;
module.exports.asString = asString;
module.exports.nowIso = nowIso;
module.exports.makeId = makeId;
