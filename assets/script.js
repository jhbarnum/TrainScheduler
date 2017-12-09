console.log('hi');

var config = {
   apiKey: "AIzaSyDfIFJX8EcBSQQAt05vHuRRvvoYnL5dCtQ",
   authDomain: "classdemo-c268e.firebaseapp.com",
   databaseURL: "https://classdemo-c268e.firebaseio.com",
   projectId: "classdemo-c268e",
   storageBucket: "classdemo-c268e.appspot.com",
   messagingSenderId: "146328975798"
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
		console.log(newTrainTime);
		newFrequency = $("#frequency").val();
		console.log(newFrequency);
		sendToDB();
	});

});
 
var sendToDB = function(){
	database.ref().push({
		name: newTrain,
		destination: newDestination,
		startTime: newTrainTime,
		frequency: newFrequency,
	})
}

database.ref().on("value", function(snapshot){
	console.log(snapshot.val());
	for (var i in snapshot.val()){
		// console.log(snapshot.val()[i].length);
		var newTD = $("<td>");
		newTD.text(snapshot.val()[i].name);
		console.log(newTD);
		var newTR = $("<tr>");
		newTR.append(newTD);
		$("tbody").append(newTR);


	}
})