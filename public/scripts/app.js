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

  $('#searchLocationForm').on('submit', function(e){
  	e.preventDefault();
  	$.ajax({
  		method: 'GET',
  		url:'api/photography',
  		data:$(this).serialize(),
  		success: searchSuccess,
  		error: searchError
  	});
  });

  
})

function handleSuccess(json) {
  allPhotos = json;

}

function handleError(e) {
  console.log('error', e);
  $('.alertBox').text('Failed to load books, is the server working?');
}

function newPhotoSuccess(json) {
  $('#newPhotoForm input').val('');
  console.log(json)
  allPhotos.push(json);
  console.log(json);
  console.log(allPhotos);
  //$("picDisplay").append(`<img src="")
  $('.alertBox1').text("Photo successfully added!")
}

function searchSuccess (json){
	$('#searchLocationForm input').val('');
	$('.picDisplay').html('');
  console.log("search", json)

  	json.forEach(photo => $('.picDisplay').append(`<img width="300px" src= ${photo.image}>`))
  


  //allPhotos.push(json);
  // console.log(json)
  // console.log(allPhotos)

}

function searchError(e){
	console.log("error", e)
}

function newPhotoError() {
  console.log("new book error!");
}

function render () {
  // empty existing pics from view
  $('.picDisplay').empty();

  // pass `allBooks` into the template function
  var photosHtml = getAllPhotosHtml(allPhotos);

  // append html to the view
  $('.picDisplay').append(photosHtml);
};

function getAllBooksHtml(books) {
  return books.map(getBookHtml).join("");
}

function getPhotoHtml(photo){
	return ''
}