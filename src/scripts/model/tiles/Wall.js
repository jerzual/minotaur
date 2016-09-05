import Tile from '../Tile';

class Wall extends Tile {

    constructor(options) {
        super(options);
        this.isBlock = true;
        this.isWall = true;
    }
}