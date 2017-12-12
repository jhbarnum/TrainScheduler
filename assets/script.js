
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
		event.preventDefault();
		$("tbody").empty();
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
		var newTrainName = snapshot.val()[i].name;
		var newTrainDestination = snapshot.val()[i].destination;
		var newTrainStart = snapshot.val()[i].startTime;
		var newTrainFrequency = snapshot.val()[i].frequency;
		$("tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" + newTrainStart + "</td><td>" + newTrainFrequency + "</td></tr>"); 
	}
});
