
const express = require("express");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let db;
// GET books with search, sorting, pagination and price filters
app.get("/books", async (req, res) => {
    try {
        const {
            search_q,
            order_by = "id",
            order = "ASC",
            limit = 10,
            offset = 0,
            min_price,
            max_price
        } = req.query;

        const allowedColumns = ["id", "title", "author", "price", "pages"];

        const sortColumn = allowedColumns.includes(order_by)
            ? order_by
            : "id";

        const sortOrder = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

        let sql = "SELECT * FROM book WHERE 1=1";
        let params = [];

        if (search_q) {
            sql += " AND title LIKE ?";
            params.push(`%${search_q}%`);
        }

        if (min_price !== undefined) {
            sql += " AND price >= ?";
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            sql += " AND price <= ?";
            params.push(Number(max_price));
        }

        sql += ` ORDER BY ${sortColumn} ${sortOrder} LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const books = await db.all(sql, params);

        res.status(200).json({
            message: "Books fetched successfully",
            data: books
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching books"
        });
    }
});
// POST - Add a new book
app.post("/books", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (!title || !author || price === undefined ||
            !Number.isFinite(Number(price))) {
            return res.status(400).json({
                message: "Title, author and valid price are required"
            });
        }

        const result = await db.run(
            "INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?)",
            [title, author, Number(price), pages || 0]
        );

        res.status(201).json({
            message: "Book created successfully",
            id: result.lastID
        });

    } catch (error) {
    console.error("POST Error:", error);

    res.status(500).json({
        message: "Failed to create book",
        error: error.message
    });
}
});
// 1. GET: Display, search, sort and filter books
app.get("/books", async (req, res) => {
    try {
        const {
            search_q = "",
            order_by = "id",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = req.query;

        const allowedColumns = [
            "id", "title", "author", "price", "pages"
        ];

        if (!allowedColumns.includes(order_by)) {
            return res.status(400).json({
                message: "Invalid order_by column"
            });
        }

        if (!["ASC", "DESC"].includes(order.toUpperCase())) {
            return res.status(400).json({
                message: "Order must be ASC or DESC"
            });
        }

        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) || pageLimit < 1 ||
            !Number.isInteger(pageOffset) || pageOffset < 0
        ) {
            return res.status(400).json({
                message: "Invalid limit or offset"
            });
        }

        let sql = "SELECT * FROM book WHERE title LIKE ?";
        const params = [`%${search_q}%`];

        if (min_price !== undefined) {
            if (min_price.trim() === "" ||
                !Number.isFinite(Number(min_price))) {
                return res.status(400).json({
                    message: "Invalid minimum price"
                });
            }

            sql += " AND price >= ?";
            params.push(Number(min_price));
        }

        if (max_price !== undefined) {
            if (max_price.trim() === "" ||
                !Number.isFinite(Number(max_price))) {
                return res.status(400).json({
                    message: "Invalid maximum price"
                });
            }

            sql += " AND price <= ?";
            params.push(Number(max_price));
        }

        sql += ` ORDER BY ${order_by} ${order.toUpperCase()} LIMIT ? OFFSET ?`;

        params.push(pageLimit, pageOffset);

        const books = await db.all(sql, params);

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch books"
        });
    }
});

// 2. GET: Display one book by ID
app.get("/books/:id", async (req, res) => {
    try {
        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [req.params.id]
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch book"
        });
    }
});

// 3. POST: Add a new book with validation
app.post("/books", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== "string" || !title.trim() ||
            typeof author !== "string" || !author.trim() ||
            price === undefined || price === null ||
            price === "" || !Number.isFinite(Number(price))
        ) {
            return res.status(400).json({
                message: "Title, author and a numeric price are required"
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [
                title.trim(),
                author.trim(),
                Number(price),
                pages === undefined ? null : pages
            ]
        );

        const newBook = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [result.lastID]
        );

        res.status(201).json({
            message: "Book created successfully",
            book: newBook
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create book"
        });
    }
});

// 4. PUT: Update a book
app.put("/books/:id", async (req, res) => {
    try {
        const { title, author, price, pages } = req.body;

        if (
            typeof title !== "string" || !title.trim() ||
            typeof author !== "string" || !author.trim() ||
            price === undefined || price === null ||
            price === "" || !Number.isFinite(Number(price))
        ) {
            return res.status(400).json({
                message: "Title, author and a numeric price are required"
            });
        }

        const result = await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [
                title.trim(),
                author.trim(),
                Number(price),
                pages === undefined ? null : pages,
                req.params.id
            ]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update book"
        });
    }
});

// 5. DELETE: Delete a book
app.delete("/books/:id", async (req, res) => {
    try {
        const result = await db.run(
            "DELETE FROM book WHERE id = ?",
            [req.params.id]
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete book"
        });
    }
});

// Start server and connect database
async function startServer() {
    db = await sqlite.open({
        filename: "./database.db",
        driver: sqlite3.Database
    });

    console.log("Database connected successfully");

   app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
}

startServer().catch((error) => {
    console.error("Server startup failed:", error);
});
