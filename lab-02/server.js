app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Library Management System</title>
        <style>
            body { font-family: Arial; background:#f2f4f8; padding:25px; }
            h1 { color:#243b64; text-align:center; }
            input, button { padding:10px; margin:5px; }
            button { background:#243b64; color:white; border:0; cursor:pointer; }
            table { width:100%; background:white; border-collapse:collapse; margin-top:20px; }
            th,td { padding:12px; border:1px solid #ddd; text-align:left; }
            th { background:#243b64; color:white; }
            .form { background:white; padding:15px; margin:15px 0; }
        </style>
    </head>
    <body>
        <h1>Library Management System</h1>

        <div class="form">
            <h3>Add / Update Book</h3>
            <input id="id" placeholder="Book ID (for update)">
            <input id="title" placeholder="Book Title">
            <input id="author" placeholder="Author">
            <input id="price" type="number" placeholder="Price">
            <input id="pages" type="number" placeholder="Pages">
            <button onclick="addBook()">POST - Add Book</button>
            <button onclick="updateBook()">PUT - Update Book</button>
            <button onclick="deleteBook()">DELETE - Delete Book</button>
            <button onclick="loadBooks()">GET - View All Books</button>
        </div>

        <p id="message"></p>
        <table>
            <thead>
                <tr><th>ID</th><th>Title</th><th>Author</th><th>Price</th><th>Pages</th></tr>
            </thead>
            <tbody id="books"></tbody>
        </table>

        <script>
            async function loadBooks() {
                const response = await fetch('/books/');
                const data = await response.json();
                document.getElementById('books').innerHTML = data.map(b =>
                    '<tr><td>'+b.id+'</td><td>'+b.title+'</td><td>'+b.author+'</td><td>₹'+b.price+'</td><td>'+b.pages+'</td></tr>'
                ).join('');
            }

            function bookData() {
                return {
                    title: document.getElementById('title').value,
                    author: document.getElementById('author').value,
                    price: Number(document.getElementById('price').value),
                    pages: Number(document.getElementById('pages').value)
                };
            }

            async function addBook() {
                const response = await fetch('/books/', {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(bookData())
                });
                document.getElementById('message').innerText = await response.text();
                loadBooks();
            }

            async function updateBook() {
                const id = document.getElementById('id').value;
                const response = await fetch('/books/'+id+'/', {
                    method:'PUT',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(bookData())
                });
                document.getElementById('message').innerText = await response.text();
                loadBooks();
            }

            async function deleteBook() {
                const id = document.getElementById('id').value;
                const response = await fetch('/books/'+id+'/', {method:'DELETE'});
                document.getElementById('message').innerText = await response.text();
                loadBooks();
            }

            loadBooks();
        </script>
    </body>
    </html>
    `);
});