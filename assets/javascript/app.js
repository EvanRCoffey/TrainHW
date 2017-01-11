var database = firebase.database();

//Populate table with firebase data whenever page loads or a new train is added
database.ref().on('child_added', function(snapshot) {
	
	// Initial Values
    var data = snapshot.val();
    var tName = data.name;
    var tDest = data.dest;
    var tFreq = data.freq;

    var tTime = data.firstTime;

    // Assumptions
	var tFrequency = tFreq;

	// Time is 3:30 AM
	var firstTime = tTime;

	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(firstTime, "HH:mm");

	// Current Time
	var currentTime = moment();

	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// Time apart (remainder)
	var tRemainder = diffTime % tFrequency;

	// Minute Until Train
	var tMinutesTillTrain = tFrequency - tRemainder;

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");

	// Append results to the table #tbody
	$("#tbody").append("<tr><td>" + tName + "</td>" + "<td>" + tDest + "</td>" + "<td>" + tFreq + "<td>" + moment(nextTrain).format("hh:mm") + "</td>" + "<td>" + tMinutesTillTrain + "</td>" + "</td></tr>");
});

//When submit button is clicked
function getTextboxes() {
	//Read values from textboxes
	var trainName = document.getElementById("trainName").value;
	var destination = document.getElementById("destination").value;
	var firstTrainTime = document.getElementById("firstTrainTime").value;
	var frequency = document.getElementById("frequency").value;

	//Push values to firebase
	writeTrainData(trainName, destination, firstTrainTime, frequency);
	function writeTrainData(trainName, destination, firstTrainTime, frequency) {
	  firebase.database().ref().push({
	    name: trainName,
	    dest: destination,
	    firstTime : firstTrainTime,
	    freq : frequency,
	    dateAdded:firebase.database.ServerValue.TIMESTAMP
	  });
	}

	//Clear textboxes for next submission
	$("#textboxes").html('Train data read successfully!  Input more train data.<br><br>Train name:<br><input type="text" id="trainName"><br>Destination:<br><input type="text" id="destination"><br>First train time (HH:mm - Military time):<br><input type="text" id="firstTrainTime"><br>Frequency (in minutes):<br><input type="text" id="frequency"><br><button onclick="getTextboxes()">Submit</button><br><br>')
}