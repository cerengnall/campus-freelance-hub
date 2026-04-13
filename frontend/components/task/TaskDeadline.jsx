function TaskDeadline({ deadline }) {
  if (!deadline) {
    return <span>No deadline</span>;
  }

  const deadlineDate = new Date(deadline);

  if (Number.isNaN(deadlineDate.getTime())) {
    return <span>Invalid deadline</span>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deadlineDate.setHours(0, 0, 0, 0);

  const isOverdue = deadlineDate < today;

  return (
    <span
      style={{
        color: isOverdue ? "#b91c1c" : "#374151",
        fontWeight: isOverdue ? 600 : 400,
      }}
    >
      Deadline: {deadlineDate.toLocaleDateString()}
    </span>
  );
}

export default TaskDeadline;
