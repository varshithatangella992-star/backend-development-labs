# LAB REPORT – 02
# SQLite Database and CRUD Routes

**Subject:** Backend Development Fundamentals  
**Year:** II  
**Term:** II  
**Student Name:** Tangella Varshitha  
**Registration Number:** 252U1R1238  
**Section:** CSE-2E  

## 1. Aim

To connect an Express.js server with an SQLite database and implement CRUD operations using HTTP methods.

## 2. Objectives

- To install and configure SQLite, SQLite3, Express.js and Nodemon.
- To create an SQLite database and a Book table.
- To perform Create, Read, Update and Delete operations.
- To develop REST API endpoints using Express.js.
- To use parameterized SQL queries to prevent SQL injection.

## 3. Software Requirements

- Visual Studio Code
- Node.js
- Express.js
- SQLite
- SQLite3
- Nodemon
- Web Browser
- PowerShell

## 4. Introduction

SQLite is a lightweight relational database used to store and manage data. Express.js is a Node.js framework used to create web servers and APIs. In this lab, SQLite is connected with an Express.js server to manage book information through CRUD operations.

## 5. Database Design

**Database Name:** database.db

**Table Name:** book

| Column Name | Data Type |
|---|---|
| id | INTEGER PRIMARY KEY AUTOINCREMENT |
| title | TEXT |
| author | TEXT |
| price | INTEGER |
| pages | INTEGER |

The database was initially populated with 10 sample book records. Additional records were added, updated and deleted during CRUD testing.

## 6. Implementation

First, Express.js, SQLite, SQLite3 and Nodemon packages are installed using NPM.

A database connection is created using the asynchronous `open()` function. The `initializeDBAndServer()` function connects to the database, creates the book table if it does not exist, inserts sample records when the table is empty, and starts the server after successful database connection.

The application uses SQL queries to insert, retrieve, update and delete book records.

Parameterized queries with `?` placeholders are used to safely handle user input and prevent SQL injection.

## 7. API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/books/` | Retrieve all books |
| GET | `/books/:bookId/` | Retrieve a particular book |
| POST | `/books/` | Add a new book |
| PUT | `/books/:bookId/` | Update book details |
| DELETE | `/books/:bookId/` | Delete a book |

## 8. Testing and Output

The Express server was successfully started on port 3000 and connected to the SQLite database.

All five API endpoints were tested:

- **GET `/books/`** – Retrieved all book records.
- **GET `/books/:bookId/`** – Retrieved a particular book using its ID.
- **POST `/books/`** – Successfully added new book records.
- **PUT `/books/:bookId/`** – Successfully updated book details.
- **DELETE `/books/:bookId/`** – Successfully deleted a book record.

The API responses were verified using a web browser and PowerShell. The output was returned in JSON format or as success messages.

### Screenshots

**1. GET All Books**

![GET All Books](screenshots/get-all-books.png)

**2. GET Book by ID**

![GET Book by ID](screenshots/get-book-by-id.png)

**3. POST – Add Book**

![POST Add Book](screenshots/book-add.png)

**4. PUT – Update Book**

![PUT Update Book](screenshots/put-book.png)

**5. DELETE – Delete Book**

![DELETE Book](screenshots/delete-book.png)

## 9. Result

The SQLite database was successfully connected with the Express.js server. The book table was created, and all five CRUD API operations were implemented and tested. Book records were added, retrieved, updated and deleted as expected.

## 10. Conclusion

This lab helped in understanding SQLite database connectivity, Express.js routing, asynchronous programming and CRUD operations. It provided practical knowledge of managing database records through REST API endpoints.

## 11. Viva Questions

**1. What is SQLite?**

SQLite is a lightweight relational database management system used to store and manage data.

**2. What is CRUD?**

CRUD stands for Create, Read, Update and Delete.

**3. What is the purpose of Express.js?**

Express.js is used to build web servers and REST APIs using Node.js.

**4. Why do we use async and await?**

They help handle asynchronous operations and wait for database operations to complete.

**5. What is SQL injection?**

SQL injection is an attack where harmful SQL statements are inserted through user input.

**6. Why do we use question mark placeholders?**

They safely pass user input into SQL queries and help prevent SQL injection.

**7. What is the difference between POST and PUT?**

POST is generally used to create a new resource, while PUT is used to update an existing resource.