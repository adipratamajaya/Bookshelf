// books data
const arrayBooks = [];
const books_RENDER = 'render-books';

// local Storage
const SAVED_EVENT = 'saved-array';
const STORAGE_KEY = 'BOOKS_WEB';


document.addEventListener('DOMContentLoaded', function () {

   if (isStorageExist()) {
      loadDataFromStorage();
    } 

   const submitBooks = document.getElementById('input_data_books');

   submitBooks.addEventListener('submit', function (event) {

     event.preventDefault();
     addBooks();
     clearInput();

   });
 });

 document.addEventListener(SAVED_EVENT, function () {
  
});

 
function addBooks () {
   const nameBooks = document.getElementById("nameBooks").value;
   const authorBooks = document.getElementById("authorBooks").value; 
   const dateBooks = document.getElementById("dateBooks").value;
   const unOrRead = document.getElementById("readvcek_").checked;
   const batchBooksSerial= batchBooks();

   const booksdata = buildData(nameBooks, authorBooks, dateBooks, unOrRead, batchBooksSerial);
   arrayBooks.push(booksdata);

   
  document.dispatchEvent(new Event(books_RENDER));
  saveData();
  

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
  namaBooks.innerText = `${booksData.name}`;
 
  const nameAuthor = document.createElement('p');
  nameAuthor.innerText = `Author : ${booksData.author}`;

  const dateBooks = document.createElement('p');
  dateBooks.innerText = `Date input : ${booksData.date}`;
 
  const booksContainer = document.createElement('div');
  booksContainer.classList.add('booksItem');
  booksContainer.append(namaBooks, nameAuthor, dateBooks);

  const container = document.createElement('div');
  container.classList.add('container_box_','animate__animated', 'animate__fadeIn');
  container.append(booksContainer);

   if( booksData.readBooks == true){

      const btnTrash = document.createElement("i");
      btnTrash.classList.add('fa-solid', 'fa-trash', 'fa-xl', 'trash_actn');
      // action
      btnTrash.addEventListener("click", function(){
         removeBooksShelft(booksData);
      })


      const rightBtn = document.createElement("i");
      rightBtn.classList.add("fa-solid","fa-arrow-down","fa-xl");
      // action
      rightBtn.addEventListener("click", function() {
         readBookShelf(booksData);
      })

      const editValue = document.createElement("button");
      editValue.classList.add("fa-solid", "fa-camera");

      const divBtn = document.createElement('div');
      divBtn.classList.add('btn_books');
      divBtn.append(btnTrash, rightBtn, editValue);
      container.append(divBtn);

   } else {
      const btnTrash = document.createElement("i");
      btnTrash.classList.add('fa-solid', 'fa-trash', 'fa-lg','trash_actn',"fa-xl");
      // action {
         btnTrash.addEventListener("click", function () {
            removeBooksShelft(booksData);
         })

      const leftBtn = document.createElement("i");
      leftBtn.classList.add("fa-solid","fa-arrow-up","fa-xl");
      // action {
         leftBtn.addEventListener("click", function () {
            unReadBookShelf(booksData);
         })
         const editValue = document.createElement("i");
         editValue.classList.add("fa-solid", "fa-gear", "fa-xl");

         editValue.addEventListener('click', function(){
          editValueBooks(booksData);
         })

      const editValue = document.createElement("button");
      editValue.classList.add("fa-solid","fa-code");

      const divBtn = document.createElement('div');
      divBtn.classList.add('btn_books');
      divBtn.append(btnTrash, leftBtn, editValue);
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
   saveData();

}

function unReadBookShelf (makeBooks) {
   const booksItems = findeBooks(makeBooks);
 
   if (booksItems == null) return;
  
   booksItems.readBooks = true;
   document.dispatchEvent(new Event(books_RENDER));
   saveData();
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

// edit value books
function editValueBooks(booksData) {

  const arrayBooks = findTodoIndex(booksData)

  // value edit
  const nameBooksEdit = document.createElement('input')
  nameBooksEdit.setAttribute('placeholder', `${booksData.name}`)

  const authorBooksedit = document.createElement('input')
  authorBooksedit.setAttribute('placeholder', `${booksData.author}`)

  const dateBooksEdit = document.createElement('input')
  dateBooksEdit.setAttribute('placeholder', `${booksData.date}`)

  const submitNewData = document.createElement('input');
  submitNewData.setAttribute('type', 'submit')
  // =========


  if ( arrayBooks == true) {

    const editMenu = document.createElement('div');
    editMenu.append(nameBooksEdit, authorBooksedit, dateBooksEdit, submitNewData);
    editMenu.classList.add('edit_menu');

    // read
    const read_____ = document.querySelector('#readBooks')
    read_____.append(editMenu)

    console.log("true")

  } else {

    const editMenu = document.createElement('div');
    editMenu.append(nameBooksEdit, authorBooksedit, dateBooksEdit, submitNewData);
    editMenu.classList.add('edit_menu');

    // unread
    const unRead____ = document.querySelector("#unReadBooks");
    unRead____.append(editMenu)

    console.log("false")
  }
  return;
}

function removeBooksShelft(array) {
   const todoTarget = findTodoIndex(array);

  //  window.onclick = function() {
  //   localStorage.removeItem("BOOKS_WEB");
  //   return '';
  // };
  
   if (todoTarget === -1) return;
   arrayBooks.splice(todoTarget, 1);
   document.dispatchEvent(new Event(books_RENDER));
   saveData();
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

//  local storage

 function saveData() {
   if (isStorageExist()) {
     const parsed = JSON.stringify(arrayBooks);
     localStorage.setItem(STORAGE_KEY, parsed);
     document.dispatchEvent(new Event(SAVED_EVENT));
   }
 }

 function isStorageExist() {
   if (typeof (Storage) === undefined) {
     alert('bowser does not support!');
     return false;
   }
   return true;
 }

 function loadDataFromStorage() {
   const serializedData = localStorage.getItem(STORAGE_KEY);
   let data = JSON.parse(serializedData);
  //  actionFound(data);
  
   if (data !== null) {
     for (const books of data) {
       arrayBooks.push(books);
     }
   }



  //  actionFound(localStorage);
   document.dispatchEvent(new Event(books_RENDER));
 }
    // input clear 
    function clearInput () {
      const nameBooks = document.getElementById("nameBooks").value = "";
      const authorBooks = document.getElementById("authorBooks").value = ""; 
      const dateBooks = document.getElementById("dateBooks").value = "";
  
  
      return nameBooks,authorBooks,dateBooks;
    }

    console.log( " Ya begitu lah :D ");