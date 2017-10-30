//* CLIENT-SIDE JS
// *
// * You may edit this file as you see fit.  Try to separate different components
// * into functions and objects as needed.
// *
// */

$(document).ready(function() {
  console.log('app.js loaded!');
  $.get('/api/albums', function(data) {
    data.albums.forEach(album => renderAlbum(album));
  });
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    let formdata = $(this).serialize();
    $(this).trigger('reset');
    $.post('/api/albums?'+formdata, function(album) {
      renderAlbum(album);
    });
  });
  $('#albums').on('click', '.add-song', handleNewSongButtonClick);
  $('#songModal').on('click', '#saveSong',handleNewSongSubmit);
});

function handleNewSongButtonClick() {
  var id = $(this).parents('.album').data('album-id'); // ex: "5665ff1678209c64e51b4e7b"
  $('#songModal').data('album-id', id);
  $('#songModal').modal();
}

// call this when the button on the modal is clicked
function handleNewSongSubmit(e) {
  e.preventDefault();

  // get data from modal fields
  let query = $('#modal-form').serialize();
  let id = $('#songModal').data().albumId;
  $('#songName').val("");
  $('#trackNumber').val("");
  // POST to SERVER
  $.post('/api/albums/' + id +'/songs?' + query, function(album) {
      $('#songModal').modal('toggle');
      // close modal
      // update the correct album to show the new song
      $(`#${album._id}`).html(buildSongsHtml(album.songs));
  });
  
  
}


function buildSongsHtml(songs) {
  let songHtml = "";
  for (var i = 0; i < songs.length; i++) {
    songHtml += `– (${songs[i].trackNumber}) ${songs[i].name} ` 
  }
  return songHtml;
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                       <h4 class='inline-header'>Songs:</h4>" +
  "                         <span class='song-list' id='"+album._id+"'>" + buildSongsHtml(album.songs) + " </span>" +
  "                      </li>" +
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
  "               <button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $('#albums').append(albumHtml);

}

//function buildSongsHtml(songs) {
//  var songText = "  – "; songs.forEach(function(song) {
// }); 
//}





