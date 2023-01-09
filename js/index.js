let listBooks = [];
//Local Storage
const saveToLocalStorage = () => {
  localStorage.setItem('Library', JSON.stringify(listBooks));
};

const getDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('Library'));
  if (data !== null) {
    listBooks = data;
  }
};

function displayBooks() {
  const section = document.querySelector('#book-list');
  let books = ``;
  getDataFromLocalStorage();

  listBooks.forEach((book, index) => {
    books += `<article class="book">
    <p>${book.title} <br> ${book.author}</p>
    <button type="button" id="${index}" class="remove-btn">Remove</button>
    <hr>
  </article>`;
  });

  if (listBooks.length === 0) {
    books = `<p>Library is empty...</p>`;
  }
  section.innerHTML = books;
  // Traget all the removeBtn
  const removeBtns = document.querySelectorAll('.remove-btn');
  removeBtns.forEach((btn) => {
    btn.addEventListener('click', removeBook);
  });
}

function addBook() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  let bookTitle = title.value;
  let bookAuthor = author.value;
  if (bookTitle.trim().length != 0 && bookAuthor.trim().length != 0) {
    const objBook = { title: bookTitle, author: bookAuthor };
    listBooks.push(objBook);
    saveToLocalStorage();
    displayBooks();
    title.value = '';
    author.value = '';
  }
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
});

function removeBook(event) {
  const bookId = parseInt(event.target.id);
  listBooks = listBooks.filter((book, index) => index !== bookId);
  saveToLocalStorage();
  displayBooks();
}

displayBooks();
