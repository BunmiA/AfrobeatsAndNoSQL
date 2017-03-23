// var db = 'https://dirichi206.cloudant.com/armhs_db';
// var username = 'theranedculdnewespontsee'
// var password = '66b5a759d0e32870a80f6194a6888b80d4059bdc'

var db = 'http://localhost:5984/test';
var username = 'test';
var password ='test';


var songList ;
 var newDataObj;

function loadTable(){
  $('#songListTable').bootstrapTable({
      data: songList
  });
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

function updateData(){
  $.ajax({
  		url: 'https://dirichi206.cloudant.com/armhs_db/',
  		type: "POST",
      contentType: "application/json",
  		data: JSON.stringify({"_id": "3a7c2c35d105702736713a35930f19f7", "_rev": "2-4b6555240489636159e4d68ca0c3a255","number": "abobo", "type": "user", "body": "my friend"}),
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
  var ArtistName = $('#ArtistName').val();

  newDataObj =
   {
    "name" : name, 
     "songTitle" :songTitle,
     "ArtistName" : ArtistName
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
        '</a>'
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
    }
};




  function getSelectedItem() {
        return $.map($('#songListTable').bootstrapTable('getSelections'), function (row) {
          console.log(row);
          return {
        "id": row.id,
        "rev": row.value.rev
    }; 
    })
  }

$(document).ready(function(){
  $('#create').click(function(){
    createNewDataObj();
    createData();
    readAllData();
  })
  $('#read').click(function(){
    readData();
  })
  $('#readAll').click(function(){
    readAllData();
  })
  $('#update').click(function(){
    updateData();
  })
  $('#delete').click(function(){
    deleteData();
    readAllData();
  })
})
