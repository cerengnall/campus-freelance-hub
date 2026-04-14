import React from "react";
import CreateTask from "../components/freelance/CreateTask.jsx";
import TaskList from "../components/freelance/TaskList.jsx";

export default function App() {
  return (
    <main style={styles.main}>
      <h1 style={styles.h1}>Yeni görev</h1>
      <CreateTask />
      <TaskList />
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    padding: 24,
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    background: "#f9fafb",
  },
  h1: {
    margin: "0 0 20px 0",
    fontSize: 22,
    color: "#101828",
  },
};
