let Flag = require("./FlagComponent");
const SocketIO = require('socket.io');


/**
 *
 * @module UserComponent
 * @class UserComponent
 */
class UserComponent {
  /**
   *Creates an instance of UserComponent.
   * @param {SocketIO.Socket} p_socket
   * @memberof UserComponent
   */
  constructor(p_socket, privilage) {
    this._id = p_socket.id;
    this.socket = p_socket;
    this.name = "Anonymous";
    this.room_id = "";

    //Type Idle, InGame, InRoom
    this.type = Flag.UserStatus.Idle;

    this.privilage = Flag.Privilage.User;
  }
}

module.exports = UserComponent;
