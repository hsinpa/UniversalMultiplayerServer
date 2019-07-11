
/**
 * @type {{Idle: number, InGame: number, InRoom: number}}
 */
const UserStatus = {
    Idle : 0,
    InGame : 1,
    InRoom : 2
}

/**
 * @type {{socket_id: string, roomCapacity : string}}
 */
const SocketIOKey = {
    socket_id : "socket_id",
    roomCapacity : "room_capacity"
}

const SocketIOEvent = {
    FindRoom : "FindRoom",
    RoomInfoUpdate : "RoomInfoUpdate",
    ForceLeaveRoom : "ForceLeaveRoom",
    CastMessage : "CastMessage"
}

/**
 * @type {{Admin: number, User: number}}
 */
const Privilage = {
    Admin : 0,
    User : 1
}

/**
 * @type {{Idle: number, InGame: number}}
 */
const RoomStatus = {
    Idle : 0,
    InGame : 1,
}
module.exports = {UserStatus, SocketIOKey, SocketIOEvent, Privilage, RoomStatus};