const _ = require('underscore'),
    UserComponent = require('../Component/UserComponent'),    
    RoomComponent = require('../Component/RoomComponent');

class RoomManager {

  constructor(p_socket, p_env) {
    this.socket = p_socket;
    this.env = p_env;
    };
    
  //============================= Room Utility Methods =============================
    /**
     * Create a new
     * @param {number} roomCapacity 
     */
    CreateRoom(roomCapacity) {
        let newRoom = new RoomComponent(roomCapacity);
        this.env.rooms.push();
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
        return x.user.length < x.max_capacity && x.type == "Idle" && x.privacy == 0;
        } );
        return validRoom;
    }

}

module.exports = RoomManager;
