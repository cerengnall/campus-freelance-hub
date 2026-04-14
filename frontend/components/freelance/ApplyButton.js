import React from "react";

/** Vite ayrı portta; apply sunucusu: node backend/freelance/apply.js */
const APPLY_URL = "http://localhost:3000/freelance/apply";

export default function ApplyButton({
  userId = "user-001",
  taskId = "task-100",
} = {}) {
  async function handleClick() {
    const res = await fetch(APPLY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, taskId }),
    });
    const text = await res.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
    console.log({ status: res.status, ok: res.ok, body });
  }

  return React.createElement(
    "button",
    { type: "button", onClick: handleClick },
    "Apply"
  );
}
