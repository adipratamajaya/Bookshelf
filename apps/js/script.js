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
   const batchBooksSerial= batchBooks();

   const booksdata = buildData(nameBooks, authorBooks, dateBooks, unOrRead, batchBooksSerial);
   arrayBooks.push(booksdata);

   console.log(booksdata);

   
  document.dispatchEvent(new Event(books_RENDER));

}

function batchBooks() {
   return +new Date();
 }

function buildData(name, author, date, readBooks, batchBooks){

   return {
      name,
      author,
      date,
      readBooks,
      batchBooks,
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

      const btnTrash = document.createElement("button");
      btnTrash.classList.add('fa-solid', 'fa-trash', 'fa-lg', 'trash_actn');
      // action
      btnTrash.addEventListener("click", function(){
         removeBooksShelft(booksData);
      })


      const rightBtn = document.createElement("button");
      rightBtn.classList.add("fa-solid", "fa-arrow-right", "fa-lg","right_ctn");
      // action
      rightBtn.addEventListener("click", function() {
         readBookShelf(booksData);
      })

      const divBtn = document.createElement('div');
      divBtn.classList.add('btn_books');
      divBtn.append(btnTrash, rightBtn);
      container.append(divBtn);

   } else {
      const btnTrash = document.createElement("button");
      btnTrash.classList.add('fa-solid', 'fa-trash', 'fa-lg','trash_actn');
      // action {
         btnTrash.addEventListener("click", function () {
            removeBooksShelft(booksData);
         })

      const leftBtn = document.createElement("button");
      leftBtn.classList.add("fa-solid", "fa-arrow-left", "fa-lg","left_actn");
      // action {
         leftBtn.addEventListener("click", function () {
            unReadBookShelf(booksData);
         })

      const divBtn = document.createElement('div');
      divBtn.classList.add('btn_books');
      divBtn.append(btnTrash, leftBtn);
      container.append(divBtn);
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

//  action buttton 

function readBookShelf (makeBooks) {
   const booksItems = findeBooks(makeBooks);
 
   if (booksItems == null) return;
  
   booksItems.readBooks = false;
   document.dispatchEvent(new Event(books_RENDER));

}

function unReadBookShelf (makeBooks) {
   const booksItems = findeBooks(makeBooks);
 
   if (booksItems == null) return;
  
   booksItems.readBooks = true;
   document.dispatchEvent(new Event(books_RENDER));
}


// finde books
function findeBooks(readBooks){

   for (const booksitems_ of arrayBooks) {
      if (booksitems_ === readBooks) {

        return booksitems_;
      }
    }
    return null;
}

function removeBooksShelft(array) {
   const todoTarget = findTodoIndex(array);
  
   if (todoTarget === -1) return;
  
   arrayBooks.splice(todoTarget, 1);
   document.dispatchEvent(new Event(books_RENDER));
 }

//  index finde batch
 function findTodoIndex(array) {
   for (const index in arrayBooks) {
     if (arrayBooks[index].name === array.name) {
       return index;
     }
   }
  
   return -1;
 }