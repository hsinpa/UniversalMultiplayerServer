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
        user.socket.on(Flag.SocketIOEvent.FindRoom, function() {
            let validRoom = self.FindRoomWithSpace();
            console.log(validRoom);
            if (validRoom != null) {
                self.AssignUserToRoom(validRoom, user);
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
        if (room.users.length >= room.max_capacity)
            return;
        room.users.push(user);

        user.socket.join(room._id);
        user.room_id = room._id;
        user.type = Flag.UserStatus.InRoom;

        this.io.to(room._id).emit(Flag.SocketIOEvent.RoomInfoUpdate, 
            JSON.stringify(this.GetRoomInfoJSONString(room, "join", user._id)) );
    }
    
    /**
     * Create a new room
     * @param {string} rawData 
     */
    CreateRoomFromRawJSON(rawData) {
        try {
            const requestJSON = JSON.parse(rawData);
            let userID = requestJSON[Flag.SocketIOKey.socket_id]
            let room_capacity = requestJSON[Flag.SocketIOKey.roomCapacity]
            console.log("Room capacity " + room_capacity);
            if (userID in this.env.users) {
                let user = this.env.users[userID];
                let newRoom = new RoomComponent(userID, room_capacity);
                this.env.rooms.push(newRoom);

                user.socket.join(newRoom._id);
                user.privilage = Flag.Privilage.Admin;
                user.room_id = newRoom._id;
            }
        } catch (e) {
            console.log("Create Room Error : " + rawData +", Error MSG " + e);
        }
    }

    /**
     *
     *
     * @param {UserComponent} p_user
     * @memberof RoomManager
     */
    LeaveRoom(p_user) {
        if (p_user.room_id != null) {

            let findRoom = this.FindRoomByID(p_user.room_id);
            
            if (findRoom == null)
                return;

            if (p_user.privilage === Flag.Privilage.Admin) {
                this.ResetRoomUser(findRoom);
                this.RemoveRoom(findRoom);
            } else {
                if (p_user.socket != null)
                    p_user.socket.leave(findRoom._id);
                
                findRoom.RemoveUser(p_user._id);
                this.io.to(p_user.room_id).emit(Flag.SocketIOEvent.RoomInfoUpdate,
                    JSON.stringify(this.GetRoomInfoJSONString(findRoom, "leave", p_user._id))  );
            }
        }
    }

    /** @Remove all user's room data
     * @param {RoomComponent} room
     */
    ResetRoomUser(room) {
        try {
            let userLength = room.users.length;

            for (let i = 0; i < userLength; i++) {
                if (room.users[i] != null) {
                    room.users[i].room_id = "";    
                }
            }

        } catch (e) {
            console.log("Create Room Error : " + rawData +", Error MSG " + e);
        }
    }

    /** @Remove this room from server  
     * @param {RoomComponent} room
     */
    RemoveRoom(room) {
        this.io.to(room._id).emit(Flag.SocketIOEvent.ForceLeaveRoom);

        this.env.rooms = _.reject(this.env.rooms, function(item) {
            return item._id === room._id; // or some complex logic
        });
    }

    /** @Get json of basic room info  
     * @param {RoomComponent} room
     * @param {string} type
     * @param {string} user_id
     */
    GetRoomInfoJSONString(room, type, user_id) {
        return {
            type : type,
            user_id : user_id,
            room_id : room._id,
            user_num : room.users.length,
            user_data : room.GetUserInfo()
        };
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

    /**
     *
     * @param {string} p_room_id
     * @returns {RoomComponent}
     * @memberof RoomManager
     */
    FindRoomByID(p_room_id) {
        return _.find(this.env.rooms, function(x) {
            return x._id == p_room_id;
        } );
    }

    /** @description Find valid, not started room for user  
     * @return {RoomComponent}  
     */
    FindRoomWithSpace() {
        var validRoom = _.find(this.env.rooms, function(x) {
        return x.users.length < x.max_capacity && x.type === Flag.RoomStatus.Idle;
        } );
        return validRoom;
    }

}

module.exports = RoomManager;
