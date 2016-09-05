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
    digWalls(dungeon) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                if (x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1) {
                    dungeon.getTileAt(this.left + x, this.top + y).isWall = true;
                }
            }
        }
    }
    placeDoors(rng, dungeon) {
        var amount = rng.random(1, 3.2);
        for (let n = 0; n < amount; n++) {
            //random position inside room
            let door = {
                x: this.left + Math.floor(rng.random() * (this.width - 2)) + 1,
                y: this.top + Math.floor(rng.random() * (this.height - 2)) + 1
            }
            if (n == 0) {
                door.x = this.left;
            }
            if (n == 1) {
                door.x = this.left + this.width - 1;
            }
            if (n == 2) {
                door.y = this.top + this.height - 1;
            }
            if (n == 3) {
                door.y = this.top;
            }
            let tile = dungeon.getTileAt(door.x, door.y);
            tile = new Door(door);
            dungeon.tiles[door.x][door.y] = tile;
            this.doors.push(tile);
        }
    }
    placeRoomInDungeon(dungeon) {

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                let tile = dungeon.getTileAt(this.left + x, this.top + y);
                tile.isPlaced = true;
                tile.isBlock = false;
            }
        }

    }
    canBePlaced(dungeon) {
        console.log('checking if room can be placed in dungeon');
        let result = true;
        for (let x = -GAP_BETWEEN_ROOMS; x < this.width + GAP_BETWEEN_ROOMS; x++) {
            for (let y = -GAP_BETWEEN_ROOMS; y < this.height + GAP_BETWEEN_ROOMS; y++) {
                let tileAt = dungeon.getTileAt(this.left + x, this.top + y);
                if (tileAt && tileAt.isPlaced) {
                    result &= false;
                }
            }
        }
        return result;
    }
}
export default Room;