import Door from './tiles/Door';

const GAP_BETWEEN_ROOMS=2;

class Room {
    constructor(options) {
        //position
        this.top = options.top;
        this.left = options.left;
        //dimension
        this.width = options.w;
        this.height = options.h;

        this.isPositioned = false;
        this.isCompleted = false;
        this.tiles = options.tiles || [];
        this.doors = options.doors || [];
        this.entities = options.entities || [];
    }
}
export default Room;