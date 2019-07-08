'use strict';

module.exports = class EventQueue {

    /**
        *Creates an instance of EventQueue.
        * @param {number} expect_queue_size
        */
    constructor(expect_queue_size) {
        /** @private */
        this.queue = new Array(expect_queue_size);
        /** @private */
        this.queueLength = 0;
    }
   
    /**
        *Queue Msg
        *
        * @param {string} infoQueue
        */
    Enqueue(infoQueue) {
        this.queue.push(infoQueue);
        this.queueLength ++;
    }
   
    /**
     *
     *
     * @returns {string}
     */
    Dequeue() {
        if (this.queueLength > 0) {
            this.queueLength --;
            
            let preserveMsg = this.queue[0];
            this.queue.splice(0, 1);

            return preserveMsg;
        } else {
            return "";
        }
    }

    Count() {
       return this.queueLength;
    }

    Clear() {
       this.queue.Clear();
       this.queueLength = 0;
    }
}
