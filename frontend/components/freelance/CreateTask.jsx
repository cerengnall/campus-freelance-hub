import React, { useState } from "react";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log({ title, description });
    setTitle("");
    setDescription("");
  }

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <label style={styles.label} htmlFor="create-task-title">
        Başlık
      </label>
      <input
        id="createTaskTitle"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        autoComplete="off"
      />

      <label style={styles.label} htmlFor="create-task-description">
        Açıklama
      </label>
      <textarea
        id="create-task-description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
        rows={4}
      />

      <button type="submit" style={styles.button}>
        Gönder
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 480,
    textAlign: "left",
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#344054",
  },
  input: {
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #d0d5dd",
    fontFamily: "inherit",
  },
  textarea: {
    padding: "10px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid #d0d5dd",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: 96,
  },
  button: {
    marginTop: 4,
    alignSelf: "flex-start",
    padding: "10px 16px",
    fontSize: 14,
    fontWeight: 600,
    color: "#ffffff",
    background: "#1570ef",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
