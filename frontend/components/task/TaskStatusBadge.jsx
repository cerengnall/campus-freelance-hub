const STATUS_STYLES = {
  todo: {
    label: "To Do",
    backgroundColor: "#f3f4f6",
    color: "#374151",
  },
  "in-progress": {
    label: "In Progress",
    backgroundColor: "#dbeafe",
    color: "#1d4ed8",
  },
  done: {
    label: "Done",
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
};

function TaskStatusBadge({ status }) {
  const badge = STATUS_STYLES[status] || {
    label: status || "Unknown",
    backgroundColor: "#f3f4f6",
    color: "#374151",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 600,
        backgroundColor: badge.backgroundColor,
        color: badge.color,
      }}
    >
      {badge.label}
    </span>
  );
}

export default TaskStatusBadge;
