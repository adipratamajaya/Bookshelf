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

function buildData(name, author, date, unReadBooks){

   return {
      name,
      author,
      date,
      unReadBooks
   }
}

document.addEventListener(books_RENDER, function () {
  console.log(arrayBooks);
});