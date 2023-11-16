const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

// Create the timeslots table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS timeslots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timeframe TEXT NOT NULL,
    date DATE NOT NULL
  )
`);

// Generate 10 random timeslots
const startDate = new Date('2023-11-20');
const endDate = new Date('2024-02-28');
const timeframes = ['8AM-6PM', '3PM-11PM'];

for (let i = 1; i <= 100; i++) {
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  const timeframe = timeframes[Math.floor(Math.random() * timeframes.length)];

  db.run(`
    INSERT INTO timeslots (timeframe, date)
    VALUES (?, ?)
  `, [timeframe, randomDate.toISOString().slice(0, 10)]);
}

db.close();
