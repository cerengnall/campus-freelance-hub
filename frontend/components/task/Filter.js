import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    if (onFilterChange) {
      onFilterChange({ status: newStatus, priority });
    }
  };

  const handlePriorityChange = (event) => {
    const newPriority = event.target.value;
    setPriority(newPriority);

    if (onFilterChange) {
      onFilterChange({ status, priority: newPriority });
    }
  };

  return (
    <div>
      <select value={status} onChange={handleStatusChange}>
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select value={priority} onChange={handlePriorityChange}>
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}

export default Filter;
