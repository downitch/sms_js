const sqlite3 = require('sqlite3').verbose();

const pathToDatabase = 'database.db';

class Role {
  constructor() {
    this.id = null;
    this.roleName = null;
  }

  setId(id) {
    this.id = id;
  }

  setRoleName(roleName) {
    this.roleName = roleName;
  }

  static getAllRoles() {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM roles', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
        db.close();
      });
    });
  }

  static getRoleById(roleId) {
    const db = new sqlite3.Database(pathToDatabase);
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM roles WHERE id = ?', [roleId], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
        db.close();
      });
    });
  }

  createRole() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('INSERT INTO roles (roleName) VALUES (?)', [this.roleName], (err) => {
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

  editRole() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('UPDATE roles SET roleName = ? WHERE id = ?', [this.roleName, this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }

  deleteRole() {
    const db = new sqlite3.Database(pathToDatabase);
    db.run('DELETE FROM roles WHERE id = ?', [this.id], (err) => {
      if (err) {
        console.error(err.message);
      }
      db.close();
    });
  }
}

module.exports = Role;
