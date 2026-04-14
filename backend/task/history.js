const history = [];

function addHistory(taskId, change) {
  const record = {
    taskId,
    change,
    timestamp: new Date().toISOString(),
  };

  history.push(record);
  return record;
}

function getHistory() {
  return history;
}

module.exports = { addHistory, getHistory };
