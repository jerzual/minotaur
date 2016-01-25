var Room = function () {
    this.start = {x: 0, y: 0};
    this.end = {x: 0, y: 0};
    this.doors = {top: false, left: false, bottom: false, right: false};
    this.doorLocation = {

    };
};

Room.prototype.isThisTileIn = function (x, y) {
    //TODO return true if given coordinates are in the room.
};

Room.prototype.hasChest = function (x, y) {

};

module.exports = Room;