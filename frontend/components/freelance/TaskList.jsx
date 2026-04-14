import React, { useState } from "react";

const DUMMY_TASKS = [
  { id: "1", label: "Task 1" },
  { id: "2", label: "Task 2" },
];

export default function TaskList() {
  const [checked, setChecked] = useState({});

  function toggle(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <ul style={styles.list}>
      {DUMMY_TASKS.map((task) => {
        const isDone = !!checked[task.id];
        return (
          <li key={task.id} style={styles.item}>
            <label style={styles.label}>
              <input
                type="checkbox"
                checked={isDone}
                onChange={() => toggle(task.id)}
              />
              <span style={isDone ? { ...styles.text, ...styles.done } : styles.text}>
                {task.label}
              </span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    marginBottom: 8,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  text: {},
  done: {
    textDecoration: "line-through",
    color: "#667085",
  },
};
