
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let db;

async function startServer() {
    try {
        // Connect to database
        db = await open({
            filename: "./database.db",
            driver: sqlite3.Database
        });

        // Create books table
        await db.exec(`
            CREATE TABLE IF NOT EXISTS book (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                author TEXT,
                price INTEGER,
                pages INTEGER
            )
        `);

        // Insert sample books if table is empty
        const count = await db.get(
            "SELECT COUNT(*) AS count FROM book"
        );

        if (count.count === 0) {
            const books = [
                ["Wings of Fire", "A.P.J. Abdul Kalam", 250, 180],
                ["The Alchemist", "Paulo Coelho", 300, 208],
                ["Harry Potter", "J.K. Rowling", 450, 350],
                ["Atomic Habits", "James Clear", 399, 320],
                ["Rich Dad Poor Dad", "Robert Kiyosaki", 350, 250],
                ["The Guide", "R.K. Narayan", 200, 220],
                ["Ikigai", "Hector Garcia", 299, 180],
                ["Think Like a Monk", "Jay Shetty", 399, 280],
                ["The Hobbit", "J.R.R. Tolkien", 450, 310],
                ["Deep Work", "Cal Newport", 350, 250]
            ];

            for (const book of books) {
                await db.run(
                    `INSERT INTO book (title, author, price, pages)
                     VALUES (?, ?, ?, ?)`,
                    book
                );
            }
        }

        // HOME PAGE
        app.get("/", (req, res) => {
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Books Management API</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background: #f4f6f9;
                            padding: 40px;
                            color: #333;
                        }
                        .container {
                            max-width: 750px;
                            margin: auto;
                            background: white;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 3px 12px #ddd;
                        }
                        h1 {
                            color: #2563eb;
                        }
                        h3 {
                            margin-top: 30px;
                        }
                        li {
                            margin: 15px 0;
                        }
                        code {
                            background: #eef2ff;
                            padding: 5px;
                            border-radius: 4px;
                        }
                        .success {
                            color: green;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Books Management API</h1>
                        <p>Welcome to the Books Management System!</p>
                        <p class="success">
                            Server is running successfully.
                        </p>

                        <h3>Available API Endpoints</h3>

                        <ul>
                            <li>GET <code>/books/</code> - Get all books</li>
                            <li>GET <code>/books/:bookId/</code> - Get a book by ID</li>
                            <li>POST <code>/books/</code> - Add a new book</li>
                            <li>PUT <code>/books/:bookId/</code> - Update a book</li>
                            <li>DELETE <code>/books/:bookId/</code> - Delete a book</li>
                        </ul>
                    </div>
                </body>
                </html>
            `);
        });

        // GET ALL BOOKS
        app.get("/books/", async (req, res) => {
            try {
                const books = await db.all("SELECT * FROM book");
                res.json(books);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // GET BOOK BY ID
        app.get("/books/:bookId/", async (req, res) => {
            try {
                const book = await db.get(
                    "SELECT * FROM book WHERE id = ?",
                    [req.params.bookId]
                );

                if (!book) {
                    return res.status(404).send("Book not found");
                }

                res.json(book);
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        // POST - ADD BOOK
        app.post("/books/", async (req, res) => {
            try {
                const { title, author, price, pages } = req.body;

                const result = await db.run(
                    `INSERT INTO book (title, author, price, pages)
                     VALUES (?, ?, ?, ?)`,
                    [title, author, price, pages]
                );

                res.status(201).send(
                    "Book added successfully. ID: " + result.lastID
                );
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        // PUT - UPDATE BOOK
        app.put("/books/:bookId/", async (req, res) => {
            try {
                const { title, author, price, pages } = req.body;

                const result = await db.run(
                    `UPDATE book
                     SET title = ?, author = ?, price = ?, pages = ?
                     WHERE id = ?`,
                    [title, author, price, pages, req.params.bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).send("Book not found");
                }

                res.send("Book updated successfully");
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        // DELETE - DELETE BOOK
        app.delete("/books/:bookId/", async (req, res) => {
            try {
                const result = await db.run(
                    "DELETE FROM book WHERE id = ?",
                    [req.params.bookId]
                );

                if (result.changes === 0) {
                    return res.status(404).send("Book not found");
                }

                res.send("Book deleted successfully");
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        // START SERVER
        app.listen(PORT, "0.0.0.0", () => {
            console.log("Server running on port " + PORT);
        });

    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

startServer();
