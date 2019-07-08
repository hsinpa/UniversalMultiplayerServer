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
    constructor(socketIO, gameLoopFps) {
         /** @type {SocketIO.Server} */
        this._socketIO = socketIO;

         /**  @type {EventQueue} */
        this.queueManager = new EventQueue(500);
        this.SetGameLoop(gameLoopFps);
    }

    /**
     *
     *
     * @param {number} fps
     */
    SetGameLoop(fps) {
        setInterval(Update, fps);
    }
    
    Update() {
        
    }
}