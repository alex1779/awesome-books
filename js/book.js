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

  addBook(book) {
    this.books.push(book);
  }

  setBooks(books) {
    this.books = books;
  }

  getBooks() {
    let books = '<table>';
    this.books.forEach((book, index) => {
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
    if (this.books.length === 0) {
      books
        += '<tr><td<p class="empty-libray">Library is empty...</p></td></tr>';
    }
    books += '</table>';
    return books;
  }

  removeBooks(bookId) {
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
  }
}
