<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/campus/events");

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return <p>Loading events...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Campus Events</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date} - {event.location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventList;
>>>>>>> e817ccb (Event API bağlantısı olusturuldu)
