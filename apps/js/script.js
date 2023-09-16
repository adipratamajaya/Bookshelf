const arrayBooks = [];
const books_RENDER = 'render-books';

document.addEventListener('DOMContentLoaded', function () {
   const submitBooks = document.getElementById('input_data_books');

   submitBooks.addEventListener('submit', function (event) {

     event.preventDefault();
     addBooks();

   });
 });

 
function addBooks () {
   const nameBooks = document.getElementById("nameBooks").value;
   const authorBooks = document.getElementById("authorBooks").value; 
   const dateBooks = document.getElementById("dateBooks").value;

   const booksdata = buildData(nameBooks, authorBooks, dateBooks, false);
   arrayBooks.push(booksdata);

     document.dispatchEvent(new Event(books_RENDER));

}

function buildData(name, author, date, readBooks){

   return {
      name,
      author,
      date,
      readBooks
   }
}

function makeBooks(booksData) {
  const namaBooks = document.createElement('h2');
  namaBooks.innerText = booksData.name;
 
  const nameAuthor = document.createElement('p');
  nameAuthor.innerText = booksData.author;

  const dateBooks = document.createElement('p');
  dateBooks.innerText = booksData.date;
 
  const booksContainer = document.createElement('div');
  booksContainer.classList.add('booksItem');
  booksContainer.append(namaBooks, nameAuthor, dateBooks);

  const container = document.createElement('div');
  container.classList.add('container_box');
  container.append(booksContainer);
 
  return container;

}

document.addEventListener(books_RENDER, function () {
  const uncompletedTODOList = document.getElementById('booksUnread');

  for (const todoItem of arrayBooks) {
    const todoElement = makeBooks(todoItem);

    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    }
  }
});
