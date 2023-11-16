const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

// Create the bids table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS bids (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bidOn INTEGER NOT NULL,
    bidBy INTEGER NOT NULL,
    approved BOOLEAN NOT NULL,
    reviewedBy INTEGER
  )
`);

// Generate 10 random bids with bidBy from 1 to 10, approved set to false, and reviewedBy left NULL
for (let i = 1; i <= 100; i++) {
  const bidOn = Math.floor(Math.random() * 100) + 1;
  const bidBy = Math.floor(Math.random() * 100) + 1;

  db.run(`
    INSERT INTO bids (bidOn, bidBy, approved, reviewedBy)
    VALUES (?, ?, 0, NULL)
  `, [bidOn, bidBy]);
}

db.close();
