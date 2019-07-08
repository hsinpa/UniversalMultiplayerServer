let Flag = require("./FlagComponent");


/**
 *
 *
 * @class UserComponent
 */
class UserComponent {

  /**
   *Creates an instance of UserComponent.
   * @param {string} p_user_id
   * @memberof UserComponent
   */
  constructor(p_user_id) {
    this._id = p_user_id;
    this.name = "Anonymous";
    this.room_id = "";

    //Type Idle, InGame, InRoom
    this.type = Flag.UserStatus.Idle;
  }
}

module.exports = UserComponent;
