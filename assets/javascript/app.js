var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = "";

var database = firebase.database();

function getTextboxes() {
	trainName = document.getElementById("trainName").value;
	destination = document.getElementById("destination").value;
	firstTrainTime = document.getElementById("firstTrainTime").value;
	frequency = document.getElementById("frequency").value;

	//Log values for error checking
	console.log(trainName);
	console.log(destination);
	console.log(firstTrainTime);
	console.log(frequency);

	//Send values to firebase
	writeTrainData(trainName, destination, firstTrainTime, frequency);
	function writeTrainData(trainName, destination, firstTrainTime, frequency) {
	  firebase.database().ref().set({
	    name: trainName,
	    dest: destination,
	    firstTime : firstTrainTime,
	    freq : frequency
	  });
	}

	//Clear textboxes for next submission
	$("#textboxes").html('Train data read successfully!  Input more train data.<br><br>Train name:<br><input type="text" id="trainName"><br>Destination:<br><input type="text" id="destination"><br>First train time (HH:mm - Military time):<br><input type="text" id="firstTrainTime"><br>Frequency (in minutes):<br><input type="text" id="frequency"><br><button onclick="getTextboxes()">Submit</button><br><br>')
}
