const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../database.db');

// Boys' names array
const boysNames = [
  'Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Henry', 'Alexander',
  'Mason', 'Michael', 'Ethan', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Aiden', 'Sebastian', 'Matthew',
  'Carter', 'Wyatt', 'Jayden', 'Gabriel', 'Owen'
];

// Girls' names array
const girlsNames = [
  'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn',
  'Abigail', 'Emily', 'Elizabeth', 'Mila', 'Ella', 'Avery', 'Sofia', 'Scarlett', 'Grace', 'Chloe',
  'Victoria', 'Aria', 'Lily', 'Aurora', 'Hannah'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'
];

const randomizeName = () => {
  const randomFirstName = Math.random() < 0.5 ? boysNames[Math.floor(Math.random() * boysNames.length)] : girlsNames[Math.floor(Math.random() * girlsNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName}${randomLastName}`;
}

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
  const randd = randomizeName();
  const username = `${randd}`;
  const email = `${randd}@example.com`;
  const password = `${randd}`;
  const roleId = 1;
  const maxBids = 10;

  db.run(`
    INSERT INTO user_accounts (username, email, password, roleId, maxBids)
    VALUES (?, ?, ?, ?, ?)
  `, [username, email, password, roleId, maxBids]);
}

db.close();
