import React, { useState } from "react";

export default function CreateEvent() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name, date, description);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Event name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button type="submit">Create</button>
    </form>
  );
}
