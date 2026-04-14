function filterTasks(tasks, status, priority) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  if (!status && !priority) {
    return tasks;
  }

  return tasks.filter((task) => {
    const statusMatch = status ? task.status === status : true;
    const priorityMatch = priority ? task.priority === priority : true;

    return statusMatch && priorityMatch;
  });
}

module.exports = filterTasks;
