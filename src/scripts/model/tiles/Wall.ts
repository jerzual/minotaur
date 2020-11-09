import Tile from '../Tile';

class Wall extends Tile {
	public isWall: any;

    constructor(options) {
        super(options);
        this.isBlock = true;
        this.isWall = true;
    }
}