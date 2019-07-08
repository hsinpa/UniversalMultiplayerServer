
class RoomComponent {
  /**
   *Creates an instance of RoomComponent.
   * @param {number} p_max_capacity
   * @memberof RoomComponent
   */
  constructor(p_max_capacity) {
    let randomID = Utility.GenerateRandomString();
    this._id = randomID.substring(randomID.length-6);
    this.user = [];
    this.max_capacity = p_max_capacity;
  }
}

module.exports = RoomComponent;
