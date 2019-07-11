const _ = require('underscore');
const Utility = require("../../utility");
const Flag = require("./FlagComponent");
const UserComponent = require("./UserComponent");

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
        /* @type {Array<string, UserComponent>} */

        /**
         * @type {Array<UserComponent>}
        */
        this.users = [];
        this.owner = p_owner_id;
        this.max_capacity = p_max_capacity;
        this.type = Flag.RoomStatus.Idle;
    }

    /**
     *
     * @return {Array<Object>}
     * @memberof RoomComponent
     */
    GetUserInfo() {
        let userInfo = [];
        let userLength = this.users.length;

        if (this.users != null) {
            for (let i = 0; i < userLength; i++) {
                userInfo.push({
                    id : this.users[i]._id
                });
            }
        }
        return userInfo;
    }

    /**
     *
     *
     * @param {string} user_id
     * @memberof RoomComponent
     */
    RemoveUser(user_id) {
        this.users = _.reject(this.users, function(item) {
            return item._id === user_id; // or some complex logic
        });
    }
}

module.exports = RoomComponent;
