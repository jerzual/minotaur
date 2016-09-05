import Tile from '../Tile';

class Exit extends Tile {

    constructor(options) {
        super(options);
        this.isEntrance = true;
    }
}