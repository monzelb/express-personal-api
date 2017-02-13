
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
  $('.alertBox1').text("Photo successfully added!")
}

function searchSuccess (json){
	$('.alertBox1').text("");
	$('#searchLocationForm input').val('');
	$('.picDisplay').html('');
  	json.forEach(photo => $('.picDisplay').append(`<a><img src= ${photo.image}><button class="dltBtn" type= "button">Delete</button></a>`))

}

function searchError(e){
	console.log("error", e)
}

function newPhotoError() {
  console.log("new book error!");
}
