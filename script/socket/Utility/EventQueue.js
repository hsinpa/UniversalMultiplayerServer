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
        this.headIndex = 0;
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
        if (this.headIndex < this.queueLength) {
            
            let preserveMsg = this.queue[this.headIndex];
            this.headIndex++;

            return preserveMsg;
        } else {
            return null;
        }
    }

    Count() {
       return this.queueLength;
    }

    Clear() {
       this.queue.length = 0;
       this.queueLength = 0;
       this.headIndex = 0;
    }
}
