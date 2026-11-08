# LAB 3 – REST API, Query Parameters, Validation and Debugging

## 1. Student Details

| Detail | Information |
|---|---|
| Name | Tangella Varshitha |
| Registration Number | 252U1R1238 |
| Section | CSE – 2E |
| Course | Backend Development Fundamentals |
| Year / Term | Year II – Term II |
| Institution | Aurora – NIAT |
| Faculty | Yugandhar |
| Lab Number | Lab 3 |

## 2. Title

**REST API, Query Parameters, Validation and Debugging using Node.js, Express.js and SQLite**

## 3. Objective

The main objective of this lab is to develop a REST API using Node.js and Express.js. The application performs CRUD operations on book records stored in an SQLite database.

This lab also demonstrates searching, sorting, filtering, pagination, input validation, error handling and debugging.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime environment |
| Express.js | REST API development |
| SQLite | Database management |
| JavaScript | Backend programming |
| VS Code | Code editor |
| Postman | API testing |
| Render | Cloud deployment |
| GitHub | Source code and project hosting |

## 5. Project Structure

```text
lab-03/
│
├── server.js
├── package.json
├── package-lock.json
├── database.db
├── README.md
│
└── screenshots/
    ├── delete-book.png
    ├── filter-books.png
    ├── get-all-books.png
    ├── get-book-by-id.png
    ├── not-found.png
    ├── pagination.png
    ├── post-book.png
    ├── put-book.png
    ├── search-books.png
    ├── sort-books.png
    └── validation-error.png
```

## 6. Application Deployment

The REST API is deployed using Render.

| Detail | Information |
|---|---|
| Platform | Render |
| Service Name | backend-development-labs-3-1kbm |
| Root Directory | lab-03 |
| Build Command | npm install |
| Start Command | node server.js |
| Deployment URL | https://backend-development-labs-3-1kbm.onrender.com |

**Live Application:**  
https://backend-development-labs-3-1kbm.onrender.com

## 7. Database Design

The application uses an SQLite database named `database.db`.

The database contains a table named `book`.

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Unique book ID |
| title | TEXT | Book title |
| author | TEXT | Author name |
| price | REAL | Book price |
| pages | INTEGER | Number of pages |

## 8. REST API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Retrieve all books |
| GET | `/books/:id` | Retrieve a book by ID |
| POST | `/books` | Add a new book |
| PUT | `/books/:id` | Update an existing book |
| DELETE | `/books/:id` | Delete a book |

### Live GET Endpoints

**GET All Books**

https://backend-development-labs-3-1kbm.onrender.com/books

**GET Book by ID**

https://backend-development-labs-3-1kbm.onrender.com/books/1

**GET Not Found Test**

https://backend-development-labs-3-1kbm.onrender.com/books/99999

## 9. Query Parameters

Query parameters are used to search, sort, filter and retrieve specific records from the database.

### 9.1 Search Books

Search books using the book title.

**Endpoint:**

https://backend-development-labs-3-1kbm.onrender.com/books?search_q=Harry

### 9.2 Sort Books

Sort books according to their price in descending order.

**Endpoint:**

https://backend-development-labs-3-1kbm.onrender.com/books?order_by=price&order=DESC

### 9.3 Pagination

Retrieve a limited number of books using limit and offset.

**Endpoint:**

https://backend-development-labs-3-1kbm.onrender.com/books?limit=5&offset=0

### 9.4 Filter Books by Price

Retrieve books within a specified price range.

**Endpoint:**

https://backend-development-labs-3-1kbm.onrender.com/books?min_price=200&max_price=400

## 10. CRUD Operations

### 10.1 Create a Book – POST

Used to add a new book to the database.

**Request Body:**

```json
{
  "title": "The Secret",
  "author": "Rhonda Byrne",
  "price": 250,
  "pages": 200
}
```

**Successful Response:**

```json
{
  "message": "Book created successfully",
  "id": 23
}
```

### 10.2 Read Books – GET

Used to retrieve all available book records from the database.

### 10.3 Update a Book – PUT

Used to update the details of an existing book.

**Endpoint:** `/books/1`

**Request Body:**

```json
{
  "title": "Updated Wings of Fire",
  "author": "A.P.J. Abdul Kalam",
  "price": 400,
  "pages": 250
}
```

**Successful Response:**

```json
{
  "message": "Book updated successfully"
}
```

### 10.4 Delete a Book – DELETE

Used to delete an existing book using its ID.

**Endpoint:** `/books/23`

**Successful Response:**

```json
{
  "message": "Book deleted successfully"
}
```

## 11. Input Validation

Input validation is used to ensure that the user provides valid information before inserting a book into the database.

The application checks:
- Book title is provided.
- Author name is provided.
- Price is a valid number.
- Required fields are not empty.

**Validation Error Response:**

```json
{
  "message": "Title, author and valid price are required"
}
```

## 12. Error Handling and Debugging

Error handling is implemented to manage invalid requests and missing book records.

The application handles:
- Invalid book IDs.
- Missing required fields.
- Invalid price values.
- Book records that do not exist.
- Database and server errors.

## 13. Screenshots and Output Results

The following screenshots demonstrate the successful execution of the REST API operations.

### 13.1 GET All Books

![GET All Books](./screenshots/get-all-books.png)

### 13.2 Search Books

![Search Books](./screenshots/search-books.png)

### 13.3 Sort Books

![Sort Books](./screenshots/sort-books.png)

### 13.4 Filter Books

![Filter Books](./screenshots/filter-books.png)

### 13.5 Pagination

![Pagination](./screenshots/pagination.png)

### 13.6 GET Book by ID

![GET Book by ID](./screenshots/get-book-by-id.png)

### 13.7 POST – Add a New Book

![POST Book](./screenshots/post-book.png)

### 13.8 PUT – Update a Book

![PUT Book](./screenshots/put-book.png)

### 13.9 DELETE – Delete a Book

![DELETE Book](./screenshots/delete-book.png)

### 13.10 Validation Error

![Validation Error](./screenshots/validation-error.png)

### 13.11 Not Found Error

![Not Found](./screenshots/not-found.png)

## 14. Testing

The API was tested using Postman and the deployed Render application.

The following operations were tested:

1. Retrieving all books.
2. Retrieving a book using its ID.
3. Adding a new book.
4. Updating an existing book.
5. Deleting a book.
6. Searching books using query parameters.
7. Sorting books by price.
8. Filtering books by price range.
9. Retrieving records using pagination.
10. Testing validation and error responses.

## 15. Results

The REST API was successfully developed and deployed.

The application performs CRUD operations and supports searching, sorting, filtering and pagination. Input validation and error handling were also tested successfully.

The deployed application can be accessed through the Render URL.

**Deployment URL:**  
https://backend-development-labs-3-1kbm.onrender.com

## 16. Learning Outcomes

Through this lab, I learned:

- How to create REST APIs using Node.js and Express.js.
- How to connect an SQLite database.
- How to perform CRUD operations.
- How to use query parameters.
- How to implement searching, sorting and filtering.
- How to implement pagination.
- How to validate user input.
- How to handle errors and debug API requests.
- How to test APIs using Postman.
- How to deploy a backend application using Render.

## 17. Conclusion

This lab helped me understand the practical implementation of REST APIs using Node.js, Express.js and SQLite. I successfully implemented CRUD operations, query parameters, validation and error handling.

The application was tested and deployed using Render. This lab improved my understanding of backend development and database operations.

## 18. Project Links

**GitHub Repository:**  
https://github.com/varshithatangella992-star/backend-development-labs

**Render Deployment:**  
https://backend-development-labs-3-1kbm.onrender.com

**Live GET All Books API:**  
https://backend-development-labs-3-1kbm.onrender.com/books

---

**Submitted by:** Tangella Varshitha  
**Registration Number:** 252U1R1238  
**Section:** CSE – 2E  
**Course:** Backend Development Fundamentals  
**Institution:** Aurora – NIAT