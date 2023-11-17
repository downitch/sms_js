const sqlite3 = require('sqlite3').verbose();

const pathToDatabase = 'database.db';

class Timeslot {
  constructor() {
    this.id = null;
    this.timeframe = null;
    this.date = null;
  }

  setId(id) {
    this.id = id;
  }

  setTimeframe(timeframe) {
    this.timeframe = timeframe;
  }

  setDate(date) {
    this.date = date;
  }

  static getAllTimeslots() {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM timeslots', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      });
    });
  }

  static getTimeslotById(timeslotId) {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM timeslots WHERE id = ?', [timeslotId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }

  createTimeslot() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('INSERT INTO timeslots (timeframe, date) VALUES (?, ?)', [this.timeframe, this.date], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        // Set the ID of the newly inserted record
        this.setId(this.lastID);
      }
      db.close();
    });
    return true;
  }

  updateTimeslot() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('UPDATE timeslots SET timeframe = ?, date = ? WHERE id = ?', [this.timeframe, this.date, this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }

  deleteTimeslot() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('DELETE FROM timeslots WHERE id = ?', [this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }
}

module.exports = Timeslot;
