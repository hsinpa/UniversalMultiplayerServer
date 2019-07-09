const UserComponent = require('./UserComponent');
const RoomComponent = require("./RoomComponent");

class EnvironmentComponent {
    /**
     *Creates an instance of EnvironmentComponent.
    * @memberof EnvironmentComponent
    */
    constructor() {
        /**
         * @type {Object<string, UserComponent>}
         */
        this.users = {};

        /**
         * @type {Array<RoomComponent>}
         */
        this.rooms = [];
    }
}

module.exports = EnvironmentComponent;
