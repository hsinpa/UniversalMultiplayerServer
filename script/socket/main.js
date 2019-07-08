const socket = require('socket.io');

let env = {
  users : {},
  rooms : []
};



/**
 *
 *
 * @param {number} fps
 */
var SetGameLoop = function(fps) {
  setInterval(ExecuteGameLoop, fps);
}

var ExecuteGameLoop = function() {
}

exports.listen = function(app) {
  const io = socket.listen(app);
  SetGameLoop(20);

  io.sockets.on('connection', function (socket) {
    console.log("connect");

    //Send back basic server info when user first connected
    socket.emit("OnConnect", JSON.stringify({
         socket_id: socket.id,
       })
    );

    //When client discconected
    socket.on('disconnect', function () {
      console.log("disconnect");
    });

  });
};