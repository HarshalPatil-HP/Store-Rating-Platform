import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pool from "./connection.db.js";

dotenv.config();

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("Admin@1234", 10);
  await pool.execute(
    "INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)",
    ["System Administrator Account", "admin@test.com", hashedPassword, "Admin Address", "admin"]
  );
  console.log("Admin seeded successfully");
  process.exit(0);
};
seedAdmin().catch((err) => {
  console.error(err);
  process.exit(1);
});
