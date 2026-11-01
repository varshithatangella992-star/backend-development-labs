
const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let db;

// Start server and connect database
async function startServer() {
    try {
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

        // Insert sample books only if table is empty
        const count = await db.get("SELECT COUNT(*) AS count FROM book");

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
                    "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
                    book
                );
            }
        }

        // HOME PAGE
        app.get("/", async (req, res) => {
            try {
                const books = await db.all("SELECT * FROM book");

                const rows = books.map(b =>
                    "<tr><td>" + b.id + "</td><td>" +
                    b.title + "</td><td>" + b.author +
                    "</td><td>₹" + b.price +
                    "</td><td>" + b.pages + "</td></tr>"
                ).join("");

                res.send(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Library Management System</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            body {
                                font-family: Arial;
                                background: #f2f4f8;
                                padding: 25px;
                            }
                            h1 {
                                color: #243b64;
                                text-align: center;
                            }
                            input, button {
                                padding: 10px;
                                margin: 5px;
                            }
                            button {
                                background: #243b64;
                                color: white;
                                border: none;
                                cursor: pointer;
                                border-radius: 5px;
                            }
                            button:hover {
                                background: #4169a1;
                            }
                            table {
                                width: 100%;
                                background: white;
                                border-collapse: collapse;
                                margin-top: 20px;
                            }
                            th, td {
                                padding: 12px;
                                border: 1px solid #ddd;
                                text-align: left;
                            }
                            th {
                                background: #243b64;
                                color: white;
                            }
                            .form {
                                background: white;
                                padding: 15px;
                                margin: 15px 0;
                                border-radius: 8px;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Library Management System</h1>

                        <div class="form">
                            <h3>Book Management - CRUD Operations</h3>

                            <input id="id" type="number" placeholder="Book ID">
                            <input id="title" placeholder="Book Title">
                            <input id="author" placeholder="Author">
                            <input id="price" type="number" placeholder="Price">
                            <input id="pages" type="number" placeholder="Pages">

                            <br>

                            <button onclick="loadBooks()">GET - View Books</button>
                            <button onclick="addBook()">POST - Add Book</button>
                            <button onclick="updateBook()">PUT - Update Book</button>
                            <button onclick="deleteBook()">DELETE - Delete Book</button>

                            <p id="message"></p>
                        </div>

                        <h3>All Books</h3>

                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Pages</th>
                                </tr>
                            </thead>
                            <tbody id="books">${rows}</tbody>
                        </table>

                        <script>
                            async function loadBooks() {
                                try {
                                    const response = await fetch('/books/');
                                    const data = await response.json();

                                    document.getElementById('books').innerHTML =
                                        data.map(function(b) {
                                            return '<tr><td>' + b.id +
                                            '</td><td>' + b.title +
                                            '</td><td>' + b.author +
                                            '</td><td>₹' + b.price +
                                            '</td><td>' + b.pages +
                                            '</td></tr>';
                                        }).join('');

                                    document.getElementById('message').innerText =
                                        'Books loaded successfully!';
                                } catch (error) {
                                    document.getElementById('message').innerText =
                                        'Unable to load books.';
                                }
                            }

                            function getBookData() {
                                return {
                                    title: document.getElementById('title').value,
                                    author: document.getElementById('author').value,
                                    price: Number(document.getElementById('price').value),
                                    pages: Number(document.getElementById('pages').value)
                                };
                            }

                            async function addBook() {
                                const response = await fetch('/books/', {
                                    method: 'POST',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(getBookData())
                                });

                                document.getElementById('message').innerText =
                                    await response.text();

                                loadBooks();
                            }

                            async function updateBook() {
                                const id = document.getElementById('id').value;

                                if (!id) {
                                    alert('Enter the Book ID to update');
                                    return;
                                }

                                const response = await fetch('/books/' + id + '/', {
                                    method: 'PUT',
                                    headers: {'Content-Type': 'application/json'},
                                    body: JSON.stringify(getBookData())
                                });

                                document.getElementById('message').innerText =
                                    await response.text();

                                loadBooks();
                            }

                            async function deleteBook() {
                                const id = document.getElementById('id').value;

                                if (!id) {
                                    alert('Enter the Book ID to delete');
                                    return;
                                }

                                if (!confirm('Are you sure you want to delete this book?')) {
                                    return;
                                }

                                const response = await fetch('/books/' + id + '/', {
                                    method: 'DELETE'
                                });

                                document.getElementById('message').innerText =
                                    await response.text();

                                loadBooks();
                            }
                        </script>
                    </body>
                    </html>
                `);
            } catch (error) {
                res.status(500).send(error.message);
            }
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
                    "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
                    [title, author, price, pages]
                );

                res.status(201).send("Book added successfully. ID: " + result.lastID);
            } catch (error) {
                res.status(500).send(error.message);
            }
        });

        // PUT - UPDATE BOOK
        app.put("/books/:bookId/", async (req, res) => {
            try {
                const { title, author, price, pages } = req.body;

                const result = await db.run(
                    "UPDATE book SET title = ?, author = ?, price = ?, pages = ? WHERE id = ?",
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
