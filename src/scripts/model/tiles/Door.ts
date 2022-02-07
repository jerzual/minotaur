import Player from '../Player';
import Tile from '../Tile';

class Door extends Tile {
	public isWall: any;
	public isDoor: any;
    /** Marker for algorithm to say door is visited */
    public isConnected: boolean;
    constructor(options: Partial<Tile>) {
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
    collide(player: Player) {
        //TODO move to another room
    }
    open() {
        
    }
    close() {

    }
}

export default Door;