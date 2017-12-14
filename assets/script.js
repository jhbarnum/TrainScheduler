// api key for firebase
var config = {
    apiKey: "AIzaSyDlhfbcukdhlbrb_4xMJ0kKC3v6M8l-9WQ",
    authDomain: "classdemo-105ab.firebaseapp.com",
    databaseURL: "https://classdemo-105ab.firebaseio.com",
    projectId: "classdemo-105ab",
    storageBucket: "classdemo-105ab.appspot.com",
    messagingSenderId: "714722563132"
};
// initialize firebase
firebase.initializeApp(config);

var database = firebase.database();
var newTrain;
var newDestination;
var newTrainTime;
var newFrequency;
var currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
var trainStart;
var difference;
var timeRemaining;
var minutesTillTrain;
var newTrainArrival;
var newTrainArrivalFormatted;
//initialize js
$(document).ready(function(){
	function update() {
//I added a current time clock to the top of the page. I felt like that was a helpful add
		$('#currentTime').html(moment().format('MMMM Do YYYY, h:mm:ss a'));
	}
	setInterval(update, 1000);
// on click event listener for the add train submit button
	$("#submit-button").on('click', function(event) {
		event.preventDefault();
		$("tbody").empty();
		newTrain = $("#trainName").val().trim();
		newDestination = $("#destination").val().trim();
		newTrainTime = $("#firstTrainTime").val();	
		newFrequency = $("#frequency").val();
// sends info to the database
		sendToDB();
// resets the entry form
		$("#trainName").val("");
  		$("#destination").val("");
  		$("#firstTrainTime").val("");
  		$("#frequency").val("");
	});
});
// sets new info to the database
var sendToDB = function(){
	newTrainData = {
		name: newTrain,
		destination: newDestination,
		startTime: newTrainTime,
		frequency: newFrequency,
	};
	database.ref().push(newTrainData);
}
// referencing the database to get values 
database.ref().on("value", function(snapshot, prevChildKey){
	for (var i in snapshot.val()){
		var newTrainName = snapshot.val()[i].name;
		var newTrainDestination = snapshot.val()[i].destination;
		var newTrainStart = snapshot.val()[i].startTime;
		var newTrainFrequency = snapshot.val()[i].frequency;
// moment.js time math 
		trainStart = moment(newTrainStart, "hh:mm").subtract(1, "years");
        difference = moment().diff(moment(trainStart), "minutes");
        timeRemaining = difference % newTrainFrequency;
        minutesTillTrain = newTrainFrequency - timeRemaining;
        newTrainArrival = moment().add(minutesTillTrain, "minutes");
        newTrainArrivalFormatted = moment(newTrainArrival).format("hh:mm");
// appends a new row of train info up on the train schedule table
		$("tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" + newTrainFrequency + "</td><td>" + newTrainArrivalFormatted + "</td><td>"+ minutesTillTrain + "</td></tr>");	
	}
});

