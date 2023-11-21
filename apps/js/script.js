// books data
const arrayBooks = [];
const books_RENDER = 'render-books';

// local Storage
const SAVED_EVENT = 'saved-array';
const STORAGE_KEY = 'BOOKS_WEB';


document.addEventListener('DOMContentLoaded', function () {

   if (isStorageExist() ) {
      loadDataFromStorage() ;
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

      const editValue = document.createElement("i");
      editValue.classList.add("fa-solid","fa-code", 'fa-xl');
      editValue.addEventListener('click', function(){
        editValueBooks(booksData);
      })

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
      editValue.classList.add("fa-solid","fa-code", 'fa-xl');
      editValue.addEventListener('click', function(){
        editValueBooks(booksData);
      })

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
   unReadBooks.innerHTML = "";
  
   for (const booksItems of arrayBooks) {
      const booksElemnts = makeBooks(booksItems);

      if (booksItems.readBooks == true)
        readBooks.append(booksElemnts);
      else
        unReadBooks.append(booksElemnts);
    }

 });

//  editValue data 
function editValueBooks(array) {
  const todoTarget = findTodoIndex(array);

  
  if (todoTarget === -1) return;
  arrayBooks.splice(todoTarget, 1);
  document.dispatchEvent(new Event(books_RENDER));
  creatValueFrom(array)
}

function creatValueFrom(array){

//from
const fromDataEdit = document.createElement('form');
fromDataEdit.classList.add('dataEditFrom');

// actionValue
const labelName = document.createElement('label');
const inputName = document.createElement('input')
labelName.setAttribute('for','name');
labelName.innerText = 'Name Books :'
inputName.setAttribute('type','text')
inputName.setAttribute('placeholder', `${array.name}`)
inputName.classList.add('nameBooksValue')

const labelAuthor = document.createElement('label');
const inputAuthor = document.createElement('input');
labelAuthor.setAttribute('for','author');
labelAuthor.innerText = 'Author Books :'
inputAuthor.setAttribute('type','text');
inputAuthor.setAttribute('placeholder',`${array.author}`)
inputAuthor.classList.add('authorBooksValue')

const labelDate = document.createElement('label');
const inputDate = document.createElement('input');
labelDate.setAttribute('for','date');
labelDate.innerText = "Date books :"
inputDate.setAttribute('type','date');
inputDate.setAttribute(`value`,`${array.date}`)
inputDate.classList.add('dateValueBooks')

const btnSave = document.createElement('input');
btnSave.setAttribute('type','button')
btnSave.setAttribute('value','save')
btnSave.setAttribute('id','savebtnValue')
btnSave.addEventListener('click', function(){
  // valueEdit
  
})


fromDataEdit.append(labelName,inputName,labelAuthor,inputAuthor, labelDate, inputDate, btnSave)

  if (array.readBooks == true){
    const readbooks_true = document.querySelector('#readBooks');
    readbooks_true.appendChild(fromDataEdit);
    

  } else {
    const unReadBooks_false = document.querySelector('#unReadBooks');
    unReadBooks_false.appendChild(fromDataEdit);

  }

  return;

}

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

function removeBooksShelft(array) {
   const todoTarget = findTodoIndex(array);

   if (todoTarget === -1) return;
   arrayBooks.splice(todoTarget, 1);
   document.dispatchEvent(new Event(books_RENDER));
   console.log(todoTarget)
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