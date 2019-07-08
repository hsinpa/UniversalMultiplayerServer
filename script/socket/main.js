const socket = require('socket.io');
const EventProcesser = require("./Components/EventProcesser");

//Paramter
const fps = 45;
let env = {
  users : {},
  rooms : []
};

exports.listen = function(app) {
    const io = socket.listen(app);
    const eventProcesser = new EventProcesser(io, fps);

    io.sockets.on('connection', function (socket) {
        console.log("connect");

        //Send back basic server info when user first connected
        socket.emit("OnConnect", JSON.stringify({
            socket_id: socket.id,
            })
        );
        
        //Will be process on message queue
        socket.on('CastMessage', function (data) {
            eventProcesser.queueManager.Enqueue(data);
        });
        
        //When client discconected
        socket.on('disconnect', function () {
            console.log("disconnect");
        });

    });
};