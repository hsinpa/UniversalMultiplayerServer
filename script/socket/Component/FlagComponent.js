
/**
 * @type {{Idle: number, InGame: number, InRoom: number}}
 */
const UserStatus = {
    Idle : 0,
    InGame : 1,
    InRoom : 2
}

/**
 * @type {{socket_id: string}}
 */
const SocketIOKey = {
    socket_id : "socket_id"
}

module.exports = {UserStatus, SocketIOKey};