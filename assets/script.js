


console.log('hi');

var config = {
    apiKey: "AIzaSyDlhfbcukdhlbrb_4xMJ0kKC3v6M8l-9WQ",
    authDomain: "classdemo-105ab.firebaseapp.com",
    databaseURL: "https://classdemo-105ab.firebaseio.com",
    projectId: "classdemo-105ab",
    storageBucket: "classdemo-105ab.appspot.com",
    messagingSenderId: "714722563132"
  };

 firebase.initializeApp(config);

var database = firebase.database();
var newTrain;
var newDestination;
var newTrainTime;
var newFrequency;
var today = 341;

$(document).ready(function(){



	$("#submit-button").on('click', function(event) {
		newTrain = $("#trainName").val().trim();
		newDestination = $("#destination").val().trim();
		newTrainTime = $("#firstTrainTime").val();	
		newFrequency = $("#frequency").val();
		sendToDB();
		$("#trainName").val("");
  		$("#destination").val("");
  		$("#firstTrainTime").val("");
  		$("#frequency").val("");
	});

});
 
var sendToDB = function(){
	newTrainData = {
	
		name: newTrain,
		destination: newDestination,
		startTime: newTrainTime,
		frequency: newFrequency,
	};
	database.ref().push(newTrainData);
}

database.ref().on("value", function(snapshot, prevChildKey){
	
for (var i in snapshot.val()){
 		//console.log(snapshot.val()[i].length);
// 		//var newTD = $("<td>");
 		
 		//console.log(newTrainName)
//   		
//   		var newTrainStart = snapshot.val().startTime;
//   		var newTrainFrequency = snapshot.val().frequency;
		console.log(i)

// 		//newTD.text(snapshot.val()[i].name);
// 		//newTDA.text(snapshot.val()[i].destination);
		var newTrainName = snapshot.val()[i].name;
		var newTrainDestination = snapshot.val()[i].destination;
		var newTrainStart = snapshot.val()[i].startTime;
		var newTrainFrequency = snapshot.val()[i].frequency;
 															//console.log(snapshot.val()[i].destination);  THIS WORKS!!!!!!!!!!!!!!!!!!
 		console.log(newTrainDestination)
 		console.log(newTrainName)
// 		console.log(newTrainDestination);
// 		console.log(newTrainStart);
// 		console.log(newTrainFrequency);
$("tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" + newTrainStart + "</td><td>" + newTrainFrequency + "</td></tr>"); 
// 		//var newTR = $("<tr>");
 	//}	
		//newTR.append(newTD);
		//newTRA.append(newTDA)
		
		//$("tbody").append(newTRA);

		}


	});
