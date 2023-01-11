/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  // Local Storage
  saveToLocalStorage() {
    localStorage.setItem('MY-Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage() {
    try {
      const data = JSON.parse(localStorage.getItem('MY-Library'));
      if (data !== null) {
        this.books = data;
      }
    } catch (error) {
      saveToLocalStorage();
    }
  }

  addBook() {
    const form = document.querySelector('#form');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const bookTitle = title.value;
    const bookAuthor = author.value;

    if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
      const objBook = new Book(bookTitle, bookAuthor);
      this.books.push(objBook);
      this.saveToLocalStorage();
      this.getBooks();
      form.reset();
    }
  }

  getBooks() {
    const section = document.querySelector('#book-list');
    this.getDataFromLocalStorage();
    let books = '<table>';
    this.books.forEach((book, index) => {
      books += `<tr>
      <td>
        <article class="book">
          <p>"${book.title}" by ${book.author}</p>
          <button type="button" id="${index}" class="btn remove-btn" onclick="removeBookFromDOM(${index})">Remove</button>
        </article>
      </td>
    </tr>
    `;
    });
    if (this.books.length === 0) {
      books
        += '<tr><td<p class="empty-libray">Library is empty...</p></td></tr>';
    }
    books += '</table>';
    section.innerHTML = books;
  }

  removeBook(bookId) {
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
    this.saveToLocalStorage();
    this.getBooks();
  }
}

// let listBooks
const listBooks = new Library();

function removeBookFromDOM(id) {
  if (id !== -1) {
    listBooks.removeBook(id);
  }
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  listBooks.addBook();
});

listBooks.getDataFromLocalStorage();
listBooks.getBooks();
removeBookFromDOM(-1);
