const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

// Create the roles table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS roles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`);

// Generate 4 roles
const roles = ['sysadmin', 'owner', 'manager', 'staff'];

roles.forEach((role) => {
  db.run(`
    INSERT INTO roles (name)
    VALUES (?)
  `, [role]);
});

db.close();
