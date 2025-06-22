import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const dummyData = [
  { name: "Alice", message: "Hello from Alice!" },
  { name: "Bob", message: "Loving this guestbook." },
  { name: "Charlie", message: "Nice work!" },
  { name: "Dillon", message: "It's working great." },
  { name: "Eve", message: "See you around!" },
];

async function seed() {
  await supabase.from("messages").insert(dummyData);
}

seed();
