const submitAction = document.getElementById('submit');


 
submitAction.addEventListener('click', () => {
   const namaBooks = document.querySelector('#nameBooks').value
   const authorBooks = document.querySelector("#authorBooks").value
   const dateBooks = document.querySelector("#dateBooks").value

   const newData = `<div>
                                <h1>${namaBooks}</h1>
                                <p>${authorBooks}</p>
                                <p>${dateBooks}</p>
                            </div>`;

   const books = document.querySelector("#input_datanya");

   books.innerHTML = newData;

   return

});