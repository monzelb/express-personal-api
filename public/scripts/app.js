console.log("Sanity Check: JS is working!");

var allPhotos= [];

$(document).ready(function(){

 

  $.ajax({
    method: 'GET',
    url: '/api/photography',
    success: handleSuccess,
    error: handleError
  });

  $('#newPhotoForm').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/photography',
      data: $(this).serialize(),
      success: newPhotoSuccess,
      error: newPhotoError
    });
  });

 /* $booksList.on('click', '.deleteBtn', function() {
    $.ajax({
      method: 'DELETE',
      url: '/api/books/'+$(this).attr('data-id'),
      success: deleteBookSuccess,
      error: deleteBookError
    });
  });


  $booksList.on('submit', '#addCharacterForm', function(e) {
    e.preventDefault();
    console.log('new characters');
    $.ajax({
      method: 'POST',
      url: '/api/books/'+$(this).attr('data-id')+'/characters',
      data: $(this).serializeArray(),
      success: newCharacterSuccess,
      error: newCharacterError
    });
  });
*/
})

function handleSuccess(json) {
  allPhotos = json;

}

function handleError(e) {
  console.log('error');
  $('.alertBox').text('Failed to load books, is the server working?');
}

function newPhotoSuccess(json) {
  $('#newPhotoForm input').val('');
  console.log(json)
  allPhotos.push(json);
  console.log(json)
  console.log(allPhotos)
  //$("picDisplay").append(`<img src="")
  //render();
}

function newPhotoError() {
  console.log("new book error!");
}

function render () {
  // empty existing posts from view
  $booksList.empty();

  // pass `allBooks` into the template function
  var booksHtml = getAllBooksHtml(allBooks);

  // append html to the view
  $booksList.append(booksHtml);
};

function getAllBooksHtml(books) {
  return books.map(getBookHtml).join("");
}

function getPhotoHtml(photo){
	return ''
}