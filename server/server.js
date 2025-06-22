import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.post("/api/messages", async (req, res) => {
  console.log("POST /api/messages body:", req.body);

  const { name, message } = req.body;
  if (!name || !message)
    return res.status(400).json({ error: "Name and message required" });

  const { data, error } = await supabase
    .from("messages")
    .insert([{ name, message }])
    .select();

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

app.get("/api/messages", async (req, res) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase select error:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
