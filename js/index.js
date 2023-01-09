const listBooks = [];

function addBook() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  let bookTitle = title.value;
  let bookAuthor = author.value;
  if (bookTitle.trim().length != 0 && bookAuthor.trim().length != 0) {
    const objBook = {title : bookTitle, author : bookAuthor};
    listBooks.push(objBook);
  }
}

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  addBook();
  console.log(listBooks);
});

function removeBook() {


}

function displayBooks() {
  const section = document.querySelector('#book-list');






}
