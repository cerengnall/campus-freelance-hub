const events = [
  {
    id: 1,
    title: "Frontend Workshop",
    date: "2026-04-20",
    location: "Engineering Hall",
  },
  {
    id: 2,
    title: "Startup Meetup",
    date: "2026-04-23",
    location: "Innovation Center",
  },
  {
    id: 3,
    title: "Hackathon Kickoff",
    date: "2026-04-27",
    location: "Main Library",
  },
];

function getEvents(_req, res) {
  return res.json(events);
}

function registerEventRoutes(app) {
  app.get("/api/campus/events", getEvents);
}

module.exports = {
  events,
  getEvents,
  registerEventRoutes,
};
