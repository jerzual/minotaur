import Tile from '../Tile';

class Door extends Tile {
	public isWall: any;
	public isDoor: any;

    constructor(options) {
        super(options);
        this.isBlock = false;
        this.isWall = false;
        this.isDoor = true;
        /**
         //TODO move to a TeleporterTile
         this.destination = {
      x: options.destination.x,
      y: options.destination.y,
      //level index
      z: options.destination.z
    }*/
    }
    collide(player) {
        //TODO move to another room
    }
    open() {
        
    }
    close() {

    }
}

export default Door;