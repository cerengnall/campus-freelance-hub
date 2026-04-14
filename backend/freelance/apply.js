/**
 * Basit apply API: POST /freelance/apply
 * Çalıştır: node backend/freelance/apply.js
 */
const http = require("http");

const PORT = Number(process.env.PORT) || 3000;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const server = http.createServer((req, res) => {
  const path = (req.url || "").split("?")[0];

  if (req.method === "OPTIONS" && path === "/freelance/apply") {
    res.writeHead(204, cors);
    res.end();
    return;
  }

  if (req.method === "POST" && path === "/freelance/apply") {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
    });
    req.on("end", () => {
      let payload;
      try {
        payload = raw ? JSON.parse(raw) : {};
      } catch {
        payload = { _parseError: true, raw };
      }
      console.log("[freelance/apply] Başvuru alındı:", payload);

      res.writeHead(200, {
        ...cors,
        "Content-Type": "application/json; charset=utf-8",
      });
      res.end(JSON.stringify({ ok: true, message: "Başvuru kaydedildi (fake)" }));
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Apply API: http://localhost:${PORT}/freelance/apply`);
});
