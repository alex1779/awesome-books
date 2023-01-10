/* eslint-disable no-undef */

// let listBooks
const listBooks = new Library();
// Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem('Library', JSON.stringify(listBooks));
};

const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('Library'));
  if (data !== null) {
    listBooks.setBooks(data.books);
  } else {
    saveToLocalStorage();
  }
};

function displayBooks() {
  const section = document.querySelector('#book-list');
  let books = '<table>';
  getDataFromLocalStorage();
  listBooks.books.forEach((book, index) => {
    books += `<tr>
    <td>
      <article class="book">
        <p>"${book.title}" by ${book.author}</p>
        <button type="button" id="${index}" class="btn remove-btn" onclick="removeBook(${index})">Remove</button>
      </article>
    </td>
  </tr>
  `;
  });

  if (listBooks.books.length === 0) {
    books += '<tr><td<p class="empty-libray">Library is empty...</p></td></tr>';
  }
  books += '</table>';
  section.innerHTML = books;
}

function removeBook(id) {
  listBooks.removeBooks(id);
  saveToLocalStorage();
  displayBooks();
}

const form = document.querySelector('#form');

function addBook() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const bookTitle = title.value;
  const bookAuthor = author.value;
  if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
    const objBook = new Book(bookTitle, bookAuthor);
    listBooks.addBook(objBook);
    saveToLocalStorage();
    displayBooks();
    form.reset();
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
});

displayBooks();
removeBook();
