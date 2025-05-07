document.addEventListener("DOMContentLoaded", () => {
  const bookDetailsContainer = document.getElementById("bookDetails");

  // Retrieve books from sessionStorage
  let books = JSON.parse(sessionStorage.getItem("books")) || [];

  const renderBooks = () => {
    bookDetailsContainer.innerHTML = "";

    if (books.length > 0) {
      books.forEach((book, index) => {
        const bookCoverPreview = book.cover
          ? `<img src="${book.cover}" alt="Book Cover" class="img-thumbnail" style="max-width: 150px; display: block; margin: 0 auto;">`
          : "No cover uploaded";

        // Determine button class based on book status
        const statusButtonClass = book.status === "Available" ? "btn-available" : "btn-borrowed";
        const statusButtonText = book.status === "Available" ? "Mark as Borrowed" : "Mark as Available";

        // Determine status color for text
        const statusColor = book.status === "Available" ? "text-success" : "text-danger";  // Green for Available, Red for Borrowed

        // Construct HTML content for the book card
        bookDetailsContainer.innerHTML += ` 
          <div class="col-md-4 col-lg-3 mb-4">
            <div class="card">
              <div class="card-header">${book.title} <br> (ISBN: ${book.isbn})</div>
              <div class="card-body">
                <p>${bookCoverPreview}</p>
                <p><strong>Title:</strong> ${book.title}</p>
                <p><strong>ISBN:</strong> ${book.isbn}</p>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Language:</strong> ${book.language}</p>
                <p><strong>Genre:</strong> ${book.genre}</p>
                <p><strong>Publisher:</strong> ${book.publisher}</p>
                <p><strong>Publication Date:</strong> ${book.publicationDate}</p>
                <p><strong>Synopsis:</strong> ${book.synopsis}</p>
                <p><strong>Status:</strong> <span class="status ${statusColor}">${book.status}</span></p>
                <button class="btn ${statusButtonClass} toggle-status">${statusButtonText}</button>
                <button class="btn btn-danger delete-book">Delete</button>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      bookDetailsContainer.innerHTML = '<h2>No book details available.</h2>';
    }

    // Attach event listeners for buttons
    document.querySelectorAll(".delete-book").forEach((btn, index) => {
      btn.addEventListener("click", () => deleteBook(index));
    });

    document.querySelectorAll(".toggle-status").forEach((btn, index) => {
      btn.addEventListener("click", () => toggleStatus(index));
    });
  };

  const deleteBook = (index) => {
    // Ask for confirmation before deleting the book
    const confirmation = confirm("Are you sure want to delete this book?");
    
    // If the user confirms, proceed with deletion
    if (confirmation) {
      books.splice(index, 1); // Remove the book from the array
      sessionStorage.setItem("books", JSON.stringify(books)); // Update sessionStorage
      renderBooks(); // Re-render the book list
    }
  };

  const toggleStatus = (index) => {
    // Toggle book status between Available and Borrowed
    books[index].status = books[index].status === "Available" ? "Borrowed" : "Available";
    sessionStorage.setItem("books", JSON.stringify(books)); // Update sessionStorage
    renderBooks(); // Re-render the book list
  };

  renderBooks();
});

function goBack() {
  window.history.back(); // Replace the current page in the history stack
}
