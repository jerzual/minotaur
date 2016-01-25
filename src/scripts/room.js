
class Room {
    constructor(opts) {
        this.start = {x: 0, y: 0};
        this.end = {x: 0, y: 0};
        this.doors = {top: false, left: false, bottom: false, right: false};
        this.doorLocation = {}
    }

    isThisTileIn(x, y) {
        //TODO return true if given coordinates are in the room.
    }


    hasChest(x, y) {

    }
}

export default Room;