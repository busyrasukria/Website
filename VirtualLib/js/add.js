document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form'); 

  function handleFormSubmit(event) {
    event.preventDefault();

    const bookCover = document.getElementById('bookCover').files[0];
    const bookTitle = document.getElementById('bookTitle').value.trim();
    const isbn = document.getElementById('isbn').value.trim();
    const author = document.getElementById('author').value.trim();
    const language = document.getElementById('language').value.trim();
    const genre = document.getElementById('genre').value.trim();
    const publisher = document.getElementById('publisher').value.trim();
    const publicationDate = document.getElementById('publicationDate').value.trim();
    const synopsis = document.getElementById('synopsis').value.trim();
    const status = document.querySelector('input[name="status"]:checked');

    let incompleteFields = []; 
    let invalidFields = []; 

    if (!bookCover) incompleteFields.push('Book Cover');
    if (!bookTitle) incompleteFields.push('Book Title');
    if (!isbn) incompleteFields.push('ISBN');
    if (!author) incompleteFields.push('Author');
    if (!language) incompleteFields.push('Language');
    if (!genre) incompleteFields.push('Genre');
    if (!publisher) incompleteFields.push('Publisher');
    if (!publicationDate) incompleteFields.push('Publication Date');
    if (!synopsis) incompleteFields.push('Synopsis');
    if (!status) incompleteFields.push('Book Status');

    const currentDate = new Date();
    const publicationDateObj = new Date(publicationDate);

    if (publicationDate && isNaN(publicationDateObj.getTime())) {
      invalidFields.push('Publication Date (Invalid date)');
    } 
    else if (publicationDateObj > currentDate) {
      invalidFields.push('Publication Date (Cannot be in the future)');
    }

    if (bookTitle && bookTitle.length < 3) {
      invalidFields.push('Book Title (Too short)');
    }

    if (isbn && !/^\d{13}$/.test(isbn)) {
      invalidFields.push('ISBN (Must be a 13-digit number )');
    }

    if (synopsis && synopsis.length <= 10) {
      invalidFields.push('Synopsis (Must be more than 10 characters)');
    }

    if (incompleteFields.length > 0 || invalidFields.length > 0) {
      alert(`Please correct the following:\n${[...incompleteFields, ...invalidFields].join('\n')}`);
      return;
  }

    const bookData = {
      title: bookTitle,
      isbn,
      author,
      language,
      genre,
      publisher,
      publicationDate,
      synopsis,
      status: status.value === "1" ? "Available" : "Borrowed",
    };

    if (bookCover) {
      const reader = new FileReader();
      reader.onload = function (e) {
        bookData.cover = e.target.result;
        saveBookData(bookData);
      };
      reader.readAsDataURL(bookCover);
    } else {
      bookData.cover = null;
      saveBookData(bookData);
    }
  }

  function saveBookData(bookData) {
    const books = JSON.parse(sessionStorage.getItem("books")) || [];
    books.push(bookData);
    sessionStorage.setItem("books", JSON.stringify(books));
    window.location.href = "../html/catalog.html";
  }

  form.addEventListener('submit', handleFormSubmit);

  window.resetForm = () => {
    form.reset();
  };
});
