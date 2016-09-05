/**
 * a Tile is the atomic unit of the map. Every thing on the map should be on a tile.
 */
export default class Tile {

    constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.isBlock = true;
        this.isPlaced = options.isPlaced || false;
    }
    toString() {
        return `(${this.x},${this.y})`;
    }
    collide(player){

    }
}
