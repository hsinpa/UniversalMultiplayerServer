'use strict';
const EventQueue = require("./EventQueue");
const socket = require('socket.io');

//@ts-check
module.exports = class EventProcesser {

    /**
     *Creates an instance of EventProcesser.
     * @param {SocketIO.Server} socketIO
     * @param {number} gameLoopFps
     */
    constructor(env, socketIO, gameLoopFps) {
         /** @type {SocketIO.Server} */
        this._socketIO = socketIO;
        this.env = env;

         /**  @type {EventQueue} */
        this.queueManager = new EventQueue(500);
        this.SetGameLoop(gameLoopFps);
        //this.Update();
    }

    /**
     *
     *
     * @param {number} fps
     */
    SetGameLoop(fps) {
        let _this = this;
        setInterval(function() {
            _this.Update();
        }, 1000 / fps);
    }
    
    Update() {
        if (this.queueManager == null)
            return;
        
        let queueLength = this.queueManager.Count();

        for (let i = 0 ; i < queueLength; i++) {
            let msgJSON = this.queueManager.Dequeue();

            if (msgJSON != null && "socket_id" in msgJSON) {

                if (msgJSON["socket_id"] in this.env.users) {
                    let user = this.env.users[msgJSON["socket_id"]];

                }
            }
        }
    }
}