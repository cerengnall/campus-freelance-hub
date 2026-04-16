import React from "react";

const cardStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dcdfe4",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.1rem",
  fontWeight: 700,
  color: "#1f2937",
};

const dateStyle = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#2563eb",
};

const descriptionStyle = {
  margin: 0,
  fontSize: "0.95rem",
  lineHeight: 1.5,
  color: "#4b5563",
};

function EventCard({
  eventName = "Etkinlik Adi",
  date = "Tarih bilgisi",
  description = "Etkinlik aciklamasi burada yer alir.",
}) {
  return (
    <div style={cardStyle}>
      <h3 style={titleStyle}>{eventName}</h3>
      <span style={dateStyle}>{date}</span>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
}

export default EventCard;
