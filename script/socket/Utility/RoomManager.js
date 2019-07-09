const _ = require('underscore'),
    UserComponent = require('../Component/UserComponent'),    
    RoomComponent = require('../Component/RoomComponent'),
    Flag = require('../Component/FlagComponent'),
    EnvironmentComponent = require('../Component/EnvironmentComponent');

class RoomManager {

    /**
     * 
     * @param {SocketIO.Server} io 
     * @param {EnvironmentComponent} p_env 
     */
  constructor(io, p_env) {
    this.io = io;
    this.env = p_env;
    };
    
  //============================= Room Register Methods =============================
    /**
     *
     *
     * @param {UserComponent} user
     * @memberof RoomManager
     */
    RegisterNewUserEvent(user) {
        let self = this;
        user.socket.on("FindRoom", function() {
            let validRoom = self.FindRoomWithSpace();
            if (validRoom != null) {
                self.AssignUserToRoom(user);
            }
        });
    }

  //============================= Room Utility Methods =============================

    /**
     *
     * @param {RoomComponent} room
     * @param {UserComponent} user
     * @memberof RoomManager
     */
    AssignUserToRoom(room, user) {
        if (room.user >= room.max_capacity)
            return;

        room.user.push(user);

        user.socket.join(room._id);
        user.room_id = newRoom._id;
        user.type = Flag.UserStatus.InRoom;

        this.io.to(room._id).emit("RoomInfoUpdate", JSON.stringify(room.user));
    }
    
    /**
     * Create a new room
     * @param {string} rawData 
     */
    CreateRoomFromRawJSON(rawData) {
        try {
            const requestJSON = JSON.parse(rawData);
            let userID = requestJSON[Flag.SocketIOKey.socket_id]

            if (userID in this.env.users) {
                let user = this.env.users[userID];
                let newRoom = new RoomComponent(userID, roomCapacity);
                this.env.rooms.push(new_room);

                user.socket.join(newRoom._id);
                user.privilage = Flag.Privilage.Admin;
            }
        } catch (e) {
            console.log("Create Room Error : " + rawData +", Error MSG " + e);
        }
    }

    /** @description Search RoomComponent by UserComponent  
     * @param {UserComponent} p_user
     * @return {RoomComponent}  
     */
    FindRoomByUser(p_user) {
        return _.find(this.env.rooms, function(x) {
        let isUserExist = _.contains(x.user, p_user);
        return isUserExist;
        } );
    }

    FindRoomByID(p_room_id) {
        return _.find(this.env.rooms, function(x) {
        return x._id == p_room_id && x.user.length < x.max_capacity;
        } );
    }

    /** @description Find valid, not started room for user  
     * @return {RoomComponent}  
     */
    FindRoomWithSpace() {
        var validRoom = _.find(this.env.rooms, function(x) {
        return x.user.length < x.max_capacity && x.type === Flag.RoomStatus.Idle;
        } );
        return validRoom;
    }

}

module.exports = RoomManager;
