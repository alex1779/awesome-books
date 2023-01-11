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
      document.getElementById('msg-add-book').innerHTML = 'New book added...';
      setTimeout(() => {
        document.getElementById('msg-add-book').innerHTML = '';
      }, 3000);
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
      books += '<tr><td<p class="empty-libray">Empty...</p></td></tr>';
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

// ====================== NAVIGATION =========================
function displayTime() {
  const option = {
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  const today = new Date();
  let date = today.toLocaleString('en-US', option);
  date = date.replace(' at', ',');
  document.getElementById('date').innerHTML = date;
  setTimeout(displayTime, 1000);
}
displayTime();

// MENUS
const listMenuLink = document.querySelector('#m-list');
const addMenuLink = document.querySelector('#m-add');
const contactMenuLink = document.querySelector('#m-contact');
// Get all the section
const mainSection = document.querySelector('.main-section');
const sections = document.querySelectorAll('section');
const pageTitle = document.querySelector('#page-title');
// Menu Links
const listLink = document.querySelector('#m-list a');
const addLink = document.querySelector('#m-add a');
const contactLink = document.querySelector('#m-contact a');

function displaySection(sectionToDisp) {
  sections.forEach((section) => {
    if (sectionToDisp === 'book-list') {
      pageTitle.style.display = 'block';
      if (!listLink.classList.contains('active')) {
        listLink.classList.add('active');
      }
      addLink.classList.remove('active');
      contactLink.classList.remove('active');
    } else if (sectionToDisp === 'add-book') {
      if (!addLink.classList.contains('active')) {
        addLink.classList.add('active');
      }

      listLink.classList.remove('active');
      contactLink.classList.remove('active');
      pageTitle.style.display = 'none';
    } else {
      if (!contactLink.classList.contains('active')) {
        contactLink.classList.add('active');
      }

      addLink.classList.remove('active');
      listLink.classList.remove('active');
      pageTitle.style.display = 'none';
    }

    if (section.id === sectionToDisp) {
      section.classList.remove('hide-section');
      section.classList.add('show-section');
    } else {
      section.classList.remove('show-section');
      section.classList.add('hide-section');
    }
  });
}
