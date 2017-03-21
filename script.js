username = 'theranedculdnewespontsee'
password = '66b5a759d0e32870a80f6194a6888b80d4059bdc'

function createData(){
  $.ajax({
  		url: 'https://dirichi206.cloudant.com/armhs_db',
  		type: "POST",
      contentType: "application/json",
      data: JSON.stringify({name: "cholo"}),
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
  		url: 'https://dirichi206.cloudant.com/armhs_db/_all_docs',
  		type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
  		error: function (resp) {
  			console.log(resp);
  		},
  		success: function (resp) {
        document.getElementById('container').innerHTML = resp;
        console.log(resp);
      }
    })
}

function readData(){
  $.ajax({
  		url: 'https://dirichi206.cloudant.com/armhs_db/3a7c2c35d105702736713a35930f19f7',
  		type: "GET",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
  		error: function (resp) {
  			console.log(resp);
  		},
  		success: function (resp) {
        document.getElementById('container').innerHTML = resp;
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
        document.getElementById('container').innerHTML = resp;
        console.log(resp);
      }
    })
}

function deleteData(){
  $.ajax({
  		url: 'https://dirichi206.cloudant.com/armhs_db/d3b6f7ee745b81bddaed1146ef21175c?rev=1-6ce27b080f1f53f85d7a53f81120231b',
  		type: "DELETE",
      contentType: "application/json",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
  		error: function (resp) {
  			console.log(resp);
  		},
  		success: function (resp) {
        document.getElementById('container').innerHTML = resp;
        console.log(resp);
      }
    })
}
