import React, { useState } from "react";

const wrapperStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dcdfe4",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const headingStyle = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#1f2937",
};

const formStyle = {
  display: "flex",
  gap: "10px",
};

const inputStyle = {
  flex: 1,
  padding: "10px 12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  fontSize: "0.95rem",
  outline: "none",
};

const buttonStyle = {
  padding: "10px 14px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  fontSize: "0.95rem",
  fontWeight: 600,
  cursor: "pointer",
};

const listStyle = {
  margin: 0,
  paddingLeft: "20px",
  color: "#374151",
};

const itemStyle = {
  marginBottom: "8px",
  lineHeight: 1.5,
};

function Todo() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const trimmedTask = task.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((prevTasks) => [...prevTasks, trimmedTask]);
    setTask("");
  };

  return (
    <div style={wrapperStyle}>
      <h3 style={headingStyle}>To-Do List</h3>

      <div style={formStyle}>
        <input
          type="text"
          value={task}
          onChange={(event) => setTask(event.target.value)}
          placeholder="Yeni gorev ekle"
          style={inputStyle}
        />
        <button type="button" onClick={handleAddTask} style={buttonStyle}>
          Ekle
        </button>
      </div>

      <ul style={listStyle}>
        {tasks.map((item, index) => (
          <li key={`${item}-${index}`} style={itemStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
