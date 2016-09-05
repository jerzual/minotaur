
import Room from '../model/Room';

import {ROOM_MIN_SIZE,ROOM_MAX_SIZE} from '../Constants';

class RoomBuilder {
    constructor(options) {
        var rng = options.rng;
        this.room = new Room({
            x: 0,
            y: 0,
            w: rng.random(
                ROOM_MIN_SIZE,
                ROOM_MAX_SIZE),
            h: rng.random(
                ROOM_MIN_SIZE,
                ROOM_MAX_SIZE)
        });
        this.room.index = options.index;
    }
    build() {
        return this.room;
    }
}

export default RoomBuilder;