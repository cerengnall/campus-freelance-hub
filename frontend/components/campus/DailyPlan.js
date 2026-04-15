import React from "react";

const dailyTasks = [
  {
    id: 1,
    time: "09:00",
    title: "Ders notlarini gozden gecir",
  },
  {
    id: 2,
    time: "11:30",
    title: "Takim toplantisina katil",
  },
  {
    id: 3,
    time: "14:00",
    title: "Etkinlik duyurusunu hazirla",
  },
  {
    id: 4,
    time: "18:00",
    title: "Gunluk gorevleri kontrol et",
  },
];

function DailyPlan() {
  return (
    <section>
      <h2>Daily Plan</h2>
      <ul style={{ paddingLeft: "20px", margin: 0 }}>
        {dailyTasks.map((task) => (
          <li key={task.id} style={{ marginBottom: "10px" }}>
            <strong>{task.time}</strong> - {task.title}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default DailyPlan;
