# LAB 3 – REST API, Query Parameters, Validation and Debugging

**Course:** Backend Development Fundamentals  
**Academic Year:** Year II – Term II  
**Institution:** Aurora   
**Student Name:** Tangella Varshitha  
**Branch:** CSE – 2E  

---

## 1. Aim

To develop a RESTful API using Node.js, Express.js and SQLite, implementing CRUD operations, query parameters, request validation, HTTP status codes and debugging.

## 2. Objectives

- Understand REST API principles and architecture.
- Create REST API endpoints using Express.js.
- Perform GET, POST, PUT and DELETE operations.
- Implement search functionality using query parameters.
- Apply sorting, pagination and filtering.
- Validate incoming request data.
- Handle errors using appropriate HTTP status codes.
- Test and debug API endpoints.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime environment |
| Express.js | Web framework |
| SQLite | Database |
| JavaScript | Programming language |
| VS Code | Code editor |
| PowerShell | API testing |

## 4. Project Structure

```text
lab-03/
│
├── server.js
├── database.db
├── check-db.js
├── package.json
├── package-lock.json
├── screenshots/
│   ├── get-all-books.png
│   ├── search-books.png
│   ├── sort-books.png
│   ├── pagination.png
│   ├── filter-books.png
│   ├── get-book-by-id.png
│   ├── post-book.png
│   ├── validation-error.png
│   ├── put-book.png
│   ├── delete-book.png
│   └── not-found.png
│
└── README.md
```

## 5. Database Design

**Database:** SQLite  
**Table:** `book`

| Column | Description |
|---|---|
| id | Unique book identification number |
| title | Name of the book |
| author | Name of the author |
| price | Price of the book |
| pages | Total number of pages |

The database stores book records and supports retrieving, adding, updating and deleting records.

## 6. Installation and Execution

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Start the server

```bash
npm start
```

### Step 3: Open the API

```text
http://localhost:3000/books
```

The server runs on port 3000.

## 7. REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

## 8. Query Parameters

Query parameters are used to retrieve specific records from the database.

### 8.1 Search

```text
http://localhost:3000/books?search_q=Harry
```

Searches books using the supported title or author fields.

### 8.2 Sorting

```text
http://localhost:3000/books?order_by=price&order=ASC
```

Sorts books by price in ascending order.

### 8.3 Pagination

```text
http://localhost:3000/books?limit=3&offset=0
```

Displays a limited number of records.

### 8.4 Filtering

```text
http://localhost:3000/books?min_price=200&max_price=500
```

Retrieves books within the specified price range.

## 9. CRUD Operations

### GET – Retrieve Books

Retrieves all available book records from the database.

### POST – Add Book

Adds a new book using JSON request data.

Example request:

```json
{
  "title": "The Secret",
  "author": "Rhonda Byrne",
  "price": 250,
  "pages": 200
}
```

### PUT – Update Book

Updates the details of an existing book using its ID.

### DELETE – Delete Book

Deletes a book record using its ID.

## 10. Request Validation

The API checks incoming data before processing requests.

- Title is required.
- Author is required.
- Price must be a valid positive number.
- Invalid input is rejected with an appropriate error response.

## 11. HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | OK – Successful request |
| 201 | Created – Resource created |
| 400 | Bad Request – Invalid input |
| 404 | Not Found – Resource does not exist |
| 500 | Internal Server Error |

## 12. Testing and Debugging

The API is tested using a browser and PowerShell.

The following operations are included in testing:

1. Retrieve all books.
2. Search books.
3. Sort books.
4. Apply pagination.
5. Filter books by price.
6. Retrieve a book by ID.
7. Add a new book.
8. Validate incorrect input.
9. Update an existing book.
10. Delete a book.
11. Handle a book ID that does not exist.

## 13. Screenshots and Output Evidence

The following screenshots show the API functionality.

### 13.1 GET All Books

![GET All Books](screenshots/get-all-books.png)

### 13.2 Search Books

![Search Books](screenshots/search-books.png)

### 13.3 Sort Books

![Sort Books](screenshots/sort-books.png)

### 13.4 Pagination

![Pagination](screenshots/pagination.png)

### 13.5 Filter Books

![Filter Books](screenshots/filter-books.png)

### 13.6 GET Book by ID

![Get Book by ID](screenshots/get-book-by-id.png)

### 13.7 POST – Add New Book

**Screenshot to be added:** `screenshots/post-book.png`

### 13.8 POST – Validation Error

**Screenshot to be added:** `screenshots/validation-error.png`

### 13.9 PUT – Update Book

**Screenshot to be added:** `screenshots/put-book.png`

### 13.10 DELETE – Delete Book

**Screenshot to be added:** `screenshots/delete-book.png`

### 13.11 GET – Book Not Found

**Screenshot to be added:** `screenshots/not-found.png`

## 14. Result

A RESTful Book Management API was developed using Node.js, Express.js and SQLite. The API supports CRUD operations, query parameters, input validation and error handling.

## 15. Conclusion

Through this lab, I learned how to develop REST APIs using Express.js and connect them with an SQLite database. I gained practical experience in handling HTTP methods, query parameters, validation, status codes and debugging.

## 16. GitHub Repository

[Backend Development Labs – GitHub](https://github.com/varshithatangella992-star/backend-development-labs)

---

**End of Lab 3 Report**