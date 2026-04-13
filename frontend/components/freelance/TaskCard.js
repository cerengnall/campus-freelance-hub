import React from "react";

export default function TaskCard({ task, onClick }) {
  if (!task) {
    return null;
  }

  const title = task.title ?? task.name ?? "Başlıksız görev";
  const shortDescription =
    task.summary ??
    task.shortDescription ??
    task.short_description ??
    (typeof task.description === "string"
      ? task.description.slice(0, 120) +
        (task.description.length > 120 ? "…" : "")
      : task.description ?? "Açıklama yok.");

  const Root = onClick ? "button" : "article";
  const rootProps = onClick
    ? {
        type: "button",
        onClick: () => onClick(task),
        style: { ...styles.card, ...styles.cardButton },
      }
    : { style: styles.card };

  return (
    <Root {...rootProps} aria-label={`Görev: ${title}`}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{shortDescription}</p>
    </Root>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e6e8ee",
    borderRadius: 12,
    padding: 14,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    textAlign: "left",
  },
  cardButton: {
    display: "block",
    width: "100%",
    cursor: "pointer",
    font: "inherit",
    fontFamily: "inherit",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: 16,
    lineHeight: 1.3,
    color: "#101828",
  },
  description: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.5,
    color: "#667085",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
};
