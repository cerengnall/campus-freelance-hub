import React from "react";

const events = [
  { id: 1, name: "Spring Career Fair", date: "2026-04-20" },
  { id: 2, name: "Tech Talk Night", date: "2026-04-25" },
  { id: 3, name: "Design Workshop", date: "2026-05-02" },
];

export default function EventList() {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.date}</p>
        </div>
      ))}
    </div>
  );
}
