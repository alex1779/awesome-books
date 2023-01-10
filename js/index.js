import { Book, Library } from './book.js';

//let listBooks = [];
let listBooks = new Library();
// Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem('Library', JSON.stringify(listBooks));
};

const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('Library'));
  if (data !== null) {
    listBooks.setBooks(data.books);
  }
};

function displayBooks() {
  const section = document.querySelector('#book-list');
  let books = `<table>`;
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

  if (listBooks.length === 0) {
    books = '<p>Library is empty...</p>';
  }
  books += '</table>';
  section.innerHTML = books;
}

function removeBook(id) {
  alert("Removebook")
  // listBooks.removeBook(id);
  // saveToLocalStorage();
  // displayBooks();
}

function addBook() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const bookTitle = title.value;
  const bookAuthor = author.value;
  if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
    //const objBook = { title: bookTitle, author: bookAuthor };
    const objBook = new Book(bookTitle, bookAuthor);
    listBooks.addBook(objBook);
    //listBooks.push(objBook);
    saveToLocalStorage();
    displayBooks();
    title.value = '';
    author.value = '';
    console.log(listBooks);
  }
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
});

displayBooks();
removeBook();
