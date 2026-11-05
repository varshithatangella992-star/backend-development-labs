const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db");

db.all(
    "SELECT name FROM sqlite_master WHERE type='table'",
    [],
    (error, rows) => {
        if (error) {
            console.log(error.message);
        } else {
            console.log("Tables in database:", rows);
        }

        db.close();
    }
);