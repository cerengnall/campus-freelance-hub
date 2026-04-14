function createTaskRecord(source, item, type, overrides = {}) {
  return {
    id: overrides.id || `${source}-${type}-${item.id || "unknown"}`,
    title: overrides.title || item.title || item.name || item.topic || "Untitled Task",
    description: overrides.description || item.description || item.details || "",
    status: overrides.status || item.status || "pending",
    deadline: overrides.deadline || item.deadline || item.date || null,
    source,
    type,
    sourceId: item.id || null
  };
}

function connectFreelanceTaskToSystem(freelanceTask) {
  return createTaskRecord("freelance", freelanceTask, "job-task", {
    status: freelanceTask.status || "open",
    deadline: freelanceTask.deadline || freelanceTask.deliveryDate || null
  });
}

function connectCampusTodoToTask(campusTodo) {
  return createTaskRecord("campus", campusTodo, "todo", {
    status: campusTodo.status || "todo"
  });
}

function connectCampusEventToTask(campusEvent) {
  return createTaskRecord("campus", campusEvent, "event", {
    title: campusEvent.title || campusEvent.name || "Campus Event",
    description: campusEvent.description || campusEvent.location || "",
    status: "scheduled",
    deadline: campusEvent.date || campusEvent.deadline || null
  });
}

function simulateFreelanceIntegration(freelanceTasks = []) {
  return freelanceTasks.map(connectFreelanceTaskToSystem);
}

function simulateCampusIntegration(data = {}) {
  const todos = (data.todos || []).map(connectCampusTodoToTask);
  const events = (data.events || []).map(connectCampusEventToTask);

  return [...todos, ...events];
}

function simulateTaskIntegration(payload = {}) {
  const freelanceTasks = simulateFreelanceIntegration(payload.freelanceTasks);
  const campusTasks = simulateCampusIntegration(payload.campus);

  return {
    freelanceTasks,
    campusTasks,
    allTasks: [...freelanceTasks, ...campusTasks]
  };
}

module.exports = {
  createTaskRecord,
  connectFreelanceTaskToSystem,
  connectCampusTodoToTask,
  connectCampusEventToTask,
  simulateFreelanceIntegration,
  simulateCampusIntegration,
  simulateTaskIntegration
};
