import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { validateInitData } from "./validateInitData.js";

const app = express();
const PORT = process.env.PORT || 8787;
const ORIGIN = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());

// Health
app.get("/health", (_, res) => res.json({ ok: true }));

// Example protected endpoint
app.get("/api/me", (req, res) => {
  const initData = req.header("X-Telegram-Init-Data") || "";
  const ok = validateInitData(initData, process.env.BOT_TOKEN || "");
  if (!ok) return res.status(401).json({ error: "Invalid init data" });

  const sp = new URLSearchParams(initData);
  const userStr = sp.get("user");
  const user = userStr ? JSON.parse(userStr) : null;

  return res.json({ user, roles: ["user"] });
});

// ---------- раздача статики клиента (п.5) ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, "../client/dist");

// отдать файлы сборки
app.use(express.static(clientDist, { index: false }));

// SPA-фоллбек: все НЕ /api/* → index.html
app.get(/^(?!\/api\/).*/, (_, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});
// ----------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
