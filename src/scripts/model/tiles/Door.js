import Tile from '../Tile';

class Door extends Tile {

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
}