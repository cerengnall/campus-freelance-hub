import React from "react";

const containerStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #dcdfe4",
  borderRadius: "14px",
  boxShadow: "0 6px 16px rgba(15, 23, 42, 0.08)",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const titleStyle = {
  margin: 0,
  fontSize: "1.4rem",
  fontWeight: 700,
  color: "#111827",
};

const dateStyle = {
  fontSize: "0.95rem",
  fontWeight: 600,
  color: "#2563eb",
};

const descriptionStyle = {
  margin: 0,
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#4b5563",
};

function EventDetail({
  eventName = "Kampus Girisimcilik Bulusmasi",
  date = "20 Nisan 2026",
  description = "Ogrenciler ve freelancer adaylari icin networking, ilham verici konusmalar ve kisa atolyeler iceren bir kampus etkinligi.",
}) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{eventName}</h2>
      <span style={dateStyle}>{date}</span>
      <p style={descriptionStyle}>{description}</p>
    </div>
  );
}

export default EventDetail;
