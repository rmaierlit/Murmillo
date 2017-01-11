// =============================================================
// NOTES:
// variable 'io' is defined in <script src="/socket.io/socket.io.js"></script> from HTML
// =============================================================
//store socketInstance in an object for later use
var socketInSession = {
  '/hard': undefined,
  '/medium': undefined,
  '/easy': undefined
};

// =============================================================
const socketJoinRoom = function (roomID, username, callback) {
// joinRoom - makes a http request to server and creates a socket connection to roomID
//            setup event emitters and listerners
// @ paramters:
  // roomID = 'hard', 'medium',  or 'easy'
// example usage in react: <button onClick={() => joinRoom('hard')}>Join Room</button>

  // var username = prompt("Enter name");
  var nameSpace = '/'+roomID;

  // HTTP Request to the server, server will create 'nameSapce' room if serverSocket does not exist
  $.get('/api/join'+nameSpace, function(res) {
    console.log('result of http request: ' + res);
  });

  // open clientSocket connection if it does not exist yet
  if (socketInSession[nameSpace] === undefined) {

    // establish a connection to nameSpace
    var clientSocket = io(nameSpace);
    // store clientSocket instance in an object so it can be accessed later
    socketInSession[nameSpace] = clientSocket;

    // Event Emitter (emit event to server) ------------------------------------
    // emit 'join' with username
    clientSocket.emit('join', username);

    // Event Listener (listen to event from server) -----------------------------
    // listen for 'message' event and display the message
    clientSocket.on('message', function(message) {
      callback(message);
    });

  }
};
// =============================================================
const socketClosePrevRoom = function(prevRoom) {

  var nameSpace = '/'+prevRoom.name;
  if (socketInSession[nameSpace] !== undefined) {
    console.log('closing socket for '+prevRoom.name)

    // grab the socket instance stored in an object
    var clientSocket = socketInSession[nameSpace];

    // disconnect clientSocket
    clientSocket.disconnect('userA');

    // remove nameSpace from socketInSession object
    delete socketInSession[nameSpace]
  };

};

// =============================================================
const socketSendChatMsg = function (roomID, message) {

  // grab the socket instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket = socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'join' with username
  clientSocket.emit('message', message);
}

// =============================================================
const socketGetProblem = function (roomID, probID, callback) {
// readyToStart - get problem over socket connection
// @ paramters:
  // roomID = 'hard', 'medium',  or 'easy'
  // probID = 1, 2, or 3
// example usage in react: <button onClick={() => readyToStart('hard', 1)}>Join Room</button>

  // grab the socket instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'getProblem' with problemID
  clientSocket.emit('getProblem', probID);

  // Event Listener (listen to event from server) -----------------------------
  // listen for 'sendProblem' event and display the problemPromt
  clientSocket.on('sendProblem', function(problem) {
    callback(problem);
  });

};
// =============================================================
const socketCompUpdate = function (roomID, callback) {

  // grab the socket instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // Event Listener (listen to event from server) -----------------------------
  // listen for 'compUpdate' event and display update
  clientSocket.on('compUpdate', function(update) {
    console.log(update);
    callback(update);
  });

};
// =============================================================
const socketSubmitSoln = function (roomID, probID, username, userSoln, handleResult) {
// submitSoln - submit user's solution over socket connection
// @ paramters: roomID = 'hard', 'medium',  or 'easy'
//              probID = 1, 2, or 3
// example usage in react: <button onClick={() =>
//  submitSoln('hard', 1, 'userA', 'var solution=....'}>SubmitSoln</button>

  console.log('submitSoln')

  var userSolnObj = {
    userSoln,
    username,
    probID,
  };

  // grab the socketHard instance stored in an object
  var nameSpace = '/'+roomID;
  var clientSocket =  socketInSession[nameSpace];

  // Event Emitter (emit event to server) ------------------------------------
  // emit 'submitSoln' with user's solution
  clientSocket.emit('submitSoln', userSolnObj);
  // Event Listener (listen to event from server) -----------------------------
  // listen for 'solutionResult' event
  clientSocket.on('solutionResult', function(result) {
    handleResult(result);
  });

};

export {socketJoinRoom, socketClosePrevRoom, socketSendChatMsg, socketGetProblem, socketSubmitSoln, socketCompUpdate};
