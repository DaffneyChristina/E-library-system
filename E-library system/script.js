document.addEventListener('DOMContentLoaded', function() {
    const searchBook = document.getElementById('searchBook');
    const borrowForm = document.getElementById('borrowForm');
    const searchResults = document.getElementById('searchResults');
    const borrowButton = document.getElementById('borrowButton');
    const borrowMessage = document.getElementById('borrowMessage');

    
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('searchQuery').value;
        try {
            const response = await fetch(`/api/books/search?query=${searchQuery}`);
            const books = await response.json();
            displaySearchResults(books);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    });


    function displaySearchResults(books) {
        let html = '';
        books.forEach(book => {
            html += `
                <div class="book">
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <button onclick="selectBook('${book._id}')">Select</button>
                </div>
            `;
        });
        searchResults.innerHTML = html;
    }


    borrowButton.addEventListener('click', async function() {
        const userId = document.getElementById('userId').value;
        const bookId = document.getElementById('bookId').value;
        try {
            const response = await fetch('/api/borrow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, bookId })
            });
            const data = await response.json();
            borrowMessage.textContent = data.message;
        } catch (error) {
            console.error('Error borrowing book:', error);
        }
    });


    window.selectBook = function(bookId) {
        document.getElementById('bookId').value = bookId;
    };
});
