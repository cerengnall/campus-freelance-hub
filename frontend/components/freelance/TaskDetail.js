import React from "react";

export default function TaskDetail({ task }) {
  if (!task) {
    return (
      <section style={styles.card} aria-label="Task detail (empty)">
        <div style={styles.header}>
          <h2 style={styles.title}>Görev detayı</h2>
        </div>
        <p style={styles.muted}>
          Detayları görmek için listeden bir görev seçin.
        </p>
      </section>
    );
  }

  const title = task.title ?? task.name ?? "Başlıksız görev";
  const description =
    task.description ?? task.detail ?? task.details ?? "Açıklama bulunmuyor.";
  const moreInfo =
    task.moreInfo ??
    task.more_info ??
    task.extra ??
    task.extraInfo ??
    task.additionalInfo ??
    null;

  return (
    <section style={styles.card} aria-label="Task detail">
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
      </div>

      <div style={styles.block}>
        <div style={styles.label}>Açıklama</div>
        <p style={styles.text}>{description}</p>
      </div>

      <div style={styles.block}>
        <div style={styles.label}>Daha detaylı bilgi</div>
        {moreInfo ? (
          <div style={styles.moreInfoBox}>
            {typeof moreInfo === "string" ? (
              <p style={styles.text}>{moreInfo}</p>
            ) : (
              <pre style={styles.pre}>
                {JSON.stringify(moreInfo, null, 2)}
              </pre>
            )}
          </div>
        ) : (
          <p style={styles.muted}>Ek detay sağlanmadı.</p>
        )}
      </div>
    </section>
  );
}

const styles = {
  card: {
    background: "#ffffff",
    border: "1px solid #e6e8ee",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingBottom: 12,
    borderBottom: "1px solid #f0f2f7",
    marginBottom: 12,
  },
  title: {
    margin: 0,
    fontSize: 18,
    lineHeight: 1.25,
    color: "#101828",
  },
  block: {
    marginTop: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.2,
    textTransform: "uppercase",
    color: "#667085",
    marginBottom: 6,
  },
  text: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.55,
    color: "#344054",
    whiteSpace: "pre-wrap",
  },
  muted: {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.55,
    color: "#667085",
  },
  moreInfoBox: {
    background: "#f9fafb",
    border: "1px solid #eef2f6",
    borderRadius: 10,
    padding: 12,
  },
  pre: {
    margin: 0,
    fontSize: 12,
    lineHeight: 1.5,
    color: "#344054",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
};

