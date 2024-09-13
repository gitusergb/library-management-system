function toggleForm() {
    const formSection = document.getElementById('addBookSection');
    formSection.classList.toggle('show');
}
  
  
  // Append a book element to the shelf
  function addBookToShelf(book) {
    const shelf = document.getElementById('shelf');
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'book-title';
    titleDiv.textContent = book.title;

    const hrDiv = document.createElement('hr');

    const authorDiv = document.createElement('div');
    authorDiv.className = 'book-author';
    authorDiv.textContent = book.author;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteBook(book._id);
        bookDiv.remove();
    };

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(hrDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(deleteButton);

    shelf.appendChild(bookDiv);
}

// Fetch books from the API and add them to the shelf
fetch('https://library-management-system-ouul.onrender.com/books')
    .then(response => response.json())
    .then(books => {
        books.books.forEach(book => {
            addBookToShelf(book);
        });
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    });

// Add a new book
document.getElementById('addBookForm').addEventListener('submit', async function(event) {
event.preventDefault();
// Collect form data
const title = document.getElementById('title').value;
const author = document.getElementById('author').value;
const isbn = document.getElementById('isbn').value;
const description = document.getElementById('description').value;
const publishedDate = document.getElementById('publishedDate').value;
const category = document.getElementById('category').value;
const price = document.getElementById('price').value;
const quantity = document.getElementById('quantity').value || 1;


const bookData = {
    title,
    author,
    isbn,
    description,
    publishedDate,
    category,
    price,
    quantity
  };
//console.log(bookData)
// Send the book data to the server
fetch('https://library-management-system-ouul.onrender.com/books/addbook', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(bookData),
})
.then(response => response.json())
.then(data => {
    console.log(data)
if (data.msg) {
    alert(data.msg);
addBookToShelf(data.book);
window.location.reload();
}
//  else {
// alert('Error adding book: ' + data.message);
// }
})
.catch(error => {
console.error('Error:', error);
alert('Error adding book');
});
});

// Delete a book
function deleteBook(bookID) {
    // Optionally send delete request to backend
    fetch(`https://library-management-system-ouul.onrender.com/books/delete/${bookID}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error deleting book:', error));
}

// Search for a book
function searchBook() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    const books = document.querySelectorAll('.book');

    books.forEach(book => {
        const title = book.querySelector('.book-title').textContent.toLowerCase();
        const author = book.querySelector('.book-author').textContent.toLowerCase();
        
        if (title.includes(query) || author.includes(query)) {
            book.style.display = 'flex';
        } else {
            book.style.display = 'none';
        }
    });
}