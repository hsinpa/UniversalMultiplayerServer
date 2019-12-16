'use strict';
const EventQueue = require("./EventQueue");
const SocketIO = require('socket.io');
const Flag = require("../Component/FlagComponent");

const EnvironmentComponent = require('../Component/EnvironmentComponent');

//@ts-check
module.exports = class EventProcesser {

    /**
     *Creates an instance of EventProcesser.
     * @param {EnvironmentComponent} env
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

            if (msgJSON != null && Flag.SocketIOKey.socket_id in msgJSON) {
                if (msgJSON[Flag.SocketIOKey.socket_id] in this.env.users) {

                    let user = this.env.users[msgJSON[Flag.SocketIOKey.socket_id]];
                    //Broadcast to all room member, except sender
                    if (user != null && user.room_id !== "" &&　user.room_id != null && user.socket != null)
                        user.socket.to(user.room_id).emit(Flag.SocketIOEvent.CastMessage, JSON.stringify( msgJSON));
                }
            }
        }
        this.queueManager.Clear();
    }
}