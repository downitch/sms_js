const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

// Create the user_accounts table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS user_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    roleId INTEGER NOT NULL,
    maxBids INTEGER NOT NULL
  )
`);

// Generate 100 random user accounts
for (let i = 1; i <= 100; i++) {
  const username = `user_${i}`;
  const email = `user${i}@example.com`;
  const password = `password${i}`;
  const roleId = 1;
  const maxBids = 10;

  db.run(`
    INSERT INTO user_accounts (username, email, password, roleId, maxBids)
    VALUES (?, ?, ?, ?, ?)
  `, [username, email, password, roleId, maxBids]);
}

db.close();
