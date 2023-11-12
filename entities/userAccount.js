const sqlite3 = require('sqlite3').verbose();

const pathToDatabase = 'database.db';

class UserAccount {
  constructor() {
    this.id = null;
    this.username = null;
    this.email = null;
    this.password = null;
    this.roleId = null;
    this.maxBids = null;
  }

  setId(id) {
    this.id = id;
  }

  setUsername(username) {
    this.username = username;
  }

  setEmail(email) {
    this.email = email;
  }

  setPassword(password) {
    this.password = password;
  }

  setRoleId(roleId) {
    this.roleId = roleId;
  }

  setMaxBids(maxBids) {
    this.maxBids = maxBids;
  }

  static getAllUserAccounts() {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM user_accounts', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      });
    });
  }

  static getUserAccountById(userId) {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM user_accounts WHERE id = ?', [userId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }

  createUserAccount() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('INSERT INTO user_accounts (username, email, password, roleId, maxBids) VALUES (?, ?, ?, ?, ?)', [this.username, this.email, this.password, this.roleId, this.maxBids], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        // Set the ID of the newly inserted record
        console.log('New user account created');
      }
      db.close();
    });
    return true;
  }

  updateUserAccount() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('UPDATE user_accounts SET username = ?, email = ?, password = ?, roleId = ?, maxBids = ? WHERE id = ?', [this.username, this.email, this.password, this.roleId, this.maxBids, this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }

  deleteUserAccount() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('DELETE FROM user_accounts WHERE id = ?', [this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }

  authenticateUserAccount() {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.get('SELECT id, roleId FROM user_accounts WHERE username = ? AND password = ?', [this.username, this.password], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }

}


module.exports = UserAccount;
