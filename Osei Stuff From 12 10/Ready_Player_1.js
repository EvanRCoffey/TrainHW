var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

var playNum = false;

connectionsRef.on("value", function(snap) {
  if (snap.numChildren() === 1){
    playnum = 1;
  }else if (snap.numChildren() === 2 && !playNum){
    playnum = 2;
  }
});

