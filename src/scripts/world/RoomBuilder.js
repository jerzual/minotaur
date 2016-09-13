
import Room from '../model/Room';

import {ROOM_MIN_SIZE,ROOM_MAX_SIZE} from '../Constants';

class RoomBuilder {
    constructor(options) {
        this.rng = options.rng;
        this.room = new Room({
            x: 0,
            y: 0
        });
        this.room.index = options.index;
    }
    generateRandomSize(){
        this.room.width = this.rng.random(
            ROOM_MIN_SIZE,
            ROOM_MAX_SIZE);
        this.room.height = this.rng.random(
            ROOM_MIN_SIZE,
            ROOM_MAX_SIZE)
    }
    build() {
        this.generateRandomSize();
        return this.room;
    }
}

export default RoomBuilder;