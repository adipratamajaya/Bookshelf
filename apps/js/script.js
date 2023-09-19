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
   const unOrRead = document.getElementById("readvcek_").checked;

   const booksdata = buildData(nameBooks, authorBooks, dateBooks, unOrRead);
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
  container.classList.add('container_box_');
  container.append(booksContainer);

   if( booksData.readBooks == true){

      const btnTrash = document.createElement("i");
      btnTrash.classList.add('fa-solid', 'fa-trash', 'fa-lg');

      const rightBtn = document.createElement("i");
      rightBtn.classList.add('fa-solid', 'fa-right-to-bracket', 'fa-lg');

      const divBtn = document.createElement('div');
      divBtn.classList.add('btn_books');
      divBtn.append(btnTrash, rightBtn);
      container.append(divBtn);

   } else {
      console.log("btn belum di buat")
   }
   
  return container;

}
document.addEventListener(books_RENDER, function () {
   const readBooks = document.getElementById('readBooks');
   readBooks.innerHTML = '';

   const unReadBooks = document.getElementById('unReadBooks');
   unReadBooks.innerHTML = '';
  
   for (const booksItems of arrayBooks) {
      const booksElemnts = makeBooks(booksItems);

      if (booksItems.readBooks == true)
        readBooks.append(booksElemnts);
      else
        unReadBooks.append(booksElemnts);
    }

 });