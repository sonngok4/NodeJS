import { EventEmitter } from 'node:events';

export class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        this.emit(message);
    }
}
