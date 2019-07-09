const Utility = require("../../utility")
let Flag = require("./FlagComponent");

class RoomComponent {
    /**
     *Creates an instance of RoomComponent.
    * @param {string} p_owner_id
    * @param {number} p_max_capacity
    * @memberof RoomComponent
    */
    constructor(p_owner_id, p_max_capacity) {
        let randomID = Utility.GenerateRandomString();
        this._id = randomID.substring(randomID.length-6);
        this.user = [];
        this.owner = p_owner_id;
        this.max_capacity = p_max_capacity;
        this.type = Flag.RoomStatus.Idle;
    }
}

module.exports = RoomComponent;
