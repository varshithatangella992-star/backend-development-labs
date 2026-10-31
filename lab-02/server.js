
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let db;

// Initialize database and start server
const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: "./database.db",
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        await db.run(`
            CREATE TABLE IF NOT EXISTS book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                price INTEGER,
                pages INTEGER
            )
        `);

        // Insert sample books only when the table is empty
        const result = await db.get("SELECT COUNT(*) AS count FROM book");

        if (result.count === 0) {
            const books = [
                ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180],
                ["The Alchemist", "Paulo Coelho", 300, 200],
                ["Harry Potter", "J.K. Rowling", 450, 320],
                ["Atomic Habits", "James Clear", 399, 280],
                ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 240],
                ["The Guide", "R.K. Narayan", 200, 190],
                ["Ikigai", "Hector Garcia", 280, 210],
                ["Think Like a Monk", "Jay Shetty", 320, 260],
                ["The Hobbit", "J.R.R. Tolkien", 400, 310],
                ["Deep Work", "Cal Newport", 370, 270]
            ];

            for (const book of books) {
                await db.run(
                    `INSERT INTO book (title, author, price, pages)
                     VALUES (?, ?, ?, ?)`,
                    book
                );
            }
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(`Database error: ${error.message}`);
        process.exit(1);
    }
};

// GET all books
app.get("/books/", async (req, res) => {
    const books = await db.all("SELECT * FROM book");
    res.status(200).json(books);
});

// GET one book
app.get("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;

    const book = await db.get(
        "SELECT * FROM book WHERE id = ?",
        [bookId]
    );

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send("Book not found");
    }
});

// POST add a book
app.post("/books/", async (req, res) => {
    const { title, author, price, pages } = req.body;

    const result = await db.run(
        `INSERT INTO book (title, author, price, pages)
         VALUES (?, ?, ?, ?)`,
        [title, author, price, pages]
    );

    res.status(201).send("Book added successfully");
});

// PUT update a book
app.put("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;
    const { title, author, price, pages } = req.body;

    const result = await db.run(
        `UPDATE book
         SET title = ?, author = ?, price = ?, pages = ?
         WHERE id = ?`,
        [title, author, price, pages, bookId]
    );

    if (result.changes === 0) {
        res.status(404).send("Book not found");
    } else {
        res.status(200).send("Book updated successfully");
    }
});

// DELETE a book
app.delete("/books/:bookId/", async (req, res) => {
    const { bookId } = req.params;

    const result = await db.run(
        "DELETE FROM book WHERE id = ?",
        [bookId]
    );

    if (result.changes === 0) {
        res.status(404).send("Book not found");
    } else {
        res.status(200).send("Book deleted successfully");
    }
});

initializeDBAndServer();
