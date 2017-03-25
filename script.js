var api_key ='test';

var db = 'http://localhost:5984/test';
var username = 'test';
var password ='test';
var trackUrls =[];

var lastfmUrlPartOne = 'http://ws.audioscrobbler.com/2.0/?method=track.search&track='
var lastfmUrlPartTwo ='&limit=10' + '&api_key=' + api_key + '&format=json'



var songList ;
var newDataObj;

function loadTable(){
  $('#songListTable').bootstrapTable({
    data: songList
  });
    $('#songListTable').bootstrapTable('load',songList);
}

function getSong(songTitle, artistName){
  $.ajax({
    url: lastfmUrlPartOne + songTitle + '&artist='+ artistName +lastfmUrlPartTwo,
    type: "GET",
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    var tracks = resp.results.trackmatches.track;
    console.log(tracks);
    trackUrls=[];
    for (var i = 0; i < tracks.length; i++) {
      trackUrls.push(tracks[i].url);
    }
    console.log(trackUrls);
    alert('You can play this song using this links ' + trackUrls.toString());

  }
})
}

function createData(){
  console.log("creating data");

  $.ajax({
    url: db+'/',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(newDataObj),
    dataType: "json",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    console.log(resp);
  }
})
}

function readAllData(){
  $.ajax({
    url: db+'/_all_docs?include_docs=true',
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    console.log(resp);
    songList = resp.rows;
    console.log("the data returned", songList);
    loadTable();
  }
})
}

function readData(){
  $.ajax({
    url: db+'/3a7c2c35d105702736713a35930f19f7',
    type: "GET",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    console.log(resp);
  }
})
}

function updateData(id,data){
  $.ajax({
    url: db+'/'+ id,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(data),
    // data: JSON.stringify({"_id": "3a7c2c35d105702736713a35930f19f7", "_rev": "2-4b6555240489636159e4d68ca0c3a255","number": "abobo", "type": "user", "body": "my friend"}),
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    console.log(resp);
  }
})
}

function deleteData(){
  var item = getSelectedItem()[0];
  var id = item.id;
  var rev = item.rev; 

  console.log("item id id ", item);
  $.ajax({
    url: db+'/'+ id+'?rev='+rev,
    type: "DELETE",
    contentType: "application/json",
    headers: {
      "Authorization": "Basic " + btoa(username + ":" + password)
    },
    error: function (resp) {
     console.log(resp);
   },
   success: function (resp) {
    console.log(resp);
  }
})
}

function createNewDataObj(){
  var name = $('#name').val();
  var songTitle = $('#songTitle').val();
  var artistName = $('#artistName').val();

  newDataObj =
  {
    "name" : name, 
    "songTitle" :songTitle,
    "artistName" : artistName
  };
  console.log("your input data is", newDataObj);

}

function actionFormatter(value, row, index) {
  return [
  '<a class="edit " href="javascript:void(0)" title="Edit">',
  '<i class="fa fa-pencil fa-fw" aria-hidden="true"></i>',
  '</a>',
  '<a class="remove"  href="javascript:void(0)" title="Remove">',
  '<i class="fa fa-trash-o fa-lg" aria-hidden="true"></i>',
  '</a>',
  '<a class="play"  href="javascript:void(0)" title="Play">',
  '<i class="fa fa-music fa-lg" aria-hidden="true"></i>',
  '</a>',
  ].join('');
}

window.actionEvents = {
  'click .edit': function (e, value, row, index) {
    alert('You click edit icon, row: ' + JSON.stringify(row));
    console.log(value, row, index);
  },
  'click .remove': function (e, value, row, index) {
    alert('You click remove icon, row: ' + JSON.stringify(row));
    console.log(value, row, index);
  },
  'click .play': function (e, value, row, index) {
    getSong(row.doc.songTitle, row.doc.artistName);
    console.log(value, row, index);
  }
};




function getSelectedItem() {
  return $.map($('#songListTable').bootstrapTable('getSelections'), function (row) {
    console.log(row);
    return {
      "id": row.id,
      "rev": row.value.rev,
      "name": row.doc.name,
      "songTitle": row.doc.songTitle,
      "artistName": row.doc.artistName
    }; 

  })
}

$(document).ready(function(){
  $('#create').click(function(){
    createNewDataObj();
    createData();   
  })
  $('#read').click(function(){
    updateData();
  })
  $('#readAll').click(function(){
    readAllData();
  })
  $('#update').click(function(){
   var test = getSelectedItem()[0];
   var id = test.id;
   var rev = test.rev;
   $('#updateModal').on('show.bs.modal', function (event) {
    var modal = $(this)
    modal.find('.modal-body #nameModal').val(test.name)
    modal.find('.modal-body #songTitleModal').val(test.songTitle)
    modal.find('.modal-body #artistNameModal').val(test.artistName)
  })
   $('#updateModal').modal('show',function(){   });
 })
  $('#delete').click(function(){
    deleteData();
    readAllData();
  })
  $('#save').click(function (event){
  var test = getSelectedItem()[0];
   var id = test.id;
   var rev = test.rev;
    var newName = $('#nameModal').val()
    var newSongTitle =  $('#songTitleModal').val()
    var newArtistName = $('#artistNameModal').val()
   var data = { "_id":id,
      "_rev": rev,
      "name": newName,
      "songTitle": newSongTitle,
      "artistName": newArtistName
    }
    updateData(id,data); 
    $('#updateModal').modal('hide');

  })


})
