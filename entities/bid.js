const sqlite3 = require('sqlite3').verbose();

const pathToDatabase = 'database.db';

class Bid {
  constructor() {
    this.id = null;
    this.bidOn = null;
    this.bidBy = null;
    this.approved = null;
    this.reviewedBy = null;
  }

  setId(id) {
    this.id = id;
  }

  setBidOn(bidOn) {
    this.bidOn = bidOn;
  }

  setBidBy(bidBy) {
    this.bidBy = bidBy;
  }

  setApproved(approved) {
    this.approved = approved;
  }

  setReviewedBy(reviewedBy) {
    this.reviewedBy = reviewedBy;
  }

  static getAllBids() {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM bids', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      });
    });
  }

  static getBidById(bidId) {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM bids WHERE id = ?', [bidId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }

  createBid() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('INSERT INTO bids (bidOn, bidBy, approved, reviewedBy) VALUES (?, ?, ?, ?)', [this.bidOn, this.bidBy, this.approved, this.reviewedBy], (err) => {
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

  editBid() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('UPDATE bids SET bidOn = ?, bidBy = ?, approved = ?, reviewedBy = ? WHERE id = ?', [this.bidOn, this.bidBy, this.approved, this.reviewedBy, this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }

  deleteBid() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('DELETE FROM bids WHERE id = ?', [this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }
}

module.exports = Bid;
