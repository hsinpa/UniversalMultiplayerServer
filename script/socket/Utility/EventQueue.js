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
        * @param {Object} infoQueue
        */
    Enqueue(infoQueue) {
        this.queue.push(infoQueue);
        this.queueLength ++;
    }
   
    /**
     *
     *
     * @returns {Object}
     */
    Dequeue() {
        if (this.queueLength > 0) {
            this.queueLength --;
            
            let preserveMsg = this.queue[0];
            this.queue.splice(0, 1);

            return preserveMsg;
        } else {
            return null;
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
