const socket = require('socket.io');

//Helper Script
const EventProcesser = require("./Utility/EventProcesser");
const RoomUtility = require('./Utility/RoomManager');

//Component
const FlagComponent = require("./Component/FlagComponent");
const UserComponent = require('./Component/UserComponent');
const EnvironmentComponent = require('./Component/EnvironmentComponent');

//Paramter
const fps = 30;

// let env = {
//     /**
//  * @type {Object<string, UserComponent>}
//  */
//   users : {},
//   rooms : []
// };

exports.listen = function(app) {
    const io = socket.listen(app);
    const env = new EnvironmentComponent();
    const eventProcesser = new EventProcesser(env, io, fps);
    const roomUtility = new RoomUtility(io,  env);

    io.sockets.on('connection', function (socket) {
        SocketIO.Socket
        console.log(socket.id + " is connect");

        //Create User and push to lookup table
        const newUser = new UserComponent(socket);

        env.users[socket.id] = newUser;
        //Send back basic server info when user first connected
        socket.emit("OnConnect", JSON.stringify({
                socket_id : socket.id,
            })
        );

        //Create room request from browser
        socket.on("CreateRoom", function (data) {
            roomUtility.CreateRoomFromRawJSON(data);
        });

        //Will be process on message queue
        socket.on('CastMessage', function (data) {
            try {
                eventProcesser.queueManager.Enqueue( JSON.parse(data) );
            } catch (e) {
                console.log("CastMessage Error , " + data);
            }        
        });
        
        //When client discconected
        socket.on('disconnect', function () {
            console.log(socket.id + " is disconnect");

            if (socket.id in env.users)
                delete env.users[socket.id];
        });

    });
};