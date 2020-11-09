import {MIN_DUNGEON_SIZE} from '../Constants';
import Room from './Room';
import Tile from './Tile';

/**
 * A Level contains a set of rooms, the tiles array, logic for entering and leaving.
 */
class Level {
	public seed: any;
	public index: any;
	public tiles: Tile[][];
	public rooms: Room[];
	public entry: Tile;
	public exit: Tile;
	public width: number;
	public height: number;

    constructor(opts: Partial<Level>) {
        this.seed = opts.seed;
        this.index = opts.index;
        //bi-dimensional array of Tiles.
        this.tiles = [[]];
        this.rooms = [];
    }

    /**
     * Fill the level with empty tiles.
     */
    initialize(width: number, height: number) {
        this.width = width;
        this.height = height;

        this.tiles = [];
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.tiles[x][y] = new Tile({
                    x,
                    y
                });
            }
        }
        var center = {
            x: width / 2,
            y: height / 2
        };
    }

    getTileAt(x:number, y:number) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.tiles[x][y];
        } else {
            return undefined;
        }
    }

    //Converts the dungeon into an astar compatible bi dimensional array, with 0 for for obstacles
    toDiggableGrid(): boolean[][] {

        let grid = [];
        for (let y = 0; y < this.height; y++) {
            grid[y] = [];
            for (let x = 0; x < this.width; x++) {
                let walkable = 0;
                let tile = this.tiles[x][y];
                /*
                 if(tile.isPlaced) {
                 walkable = 0;
                 }*/
                if (!tile.isPlaced || tile.isDoor) {
                    walkable = 1;
                }
                grid[y][x] = walkable;
            }
        }
        //debug draw the collisionGrid on a canvas.
        /*
         let gridCanvas =  document.createElement("canvas");
         gridCanvas.width = this.width;
         gridCanvas.height = this.height;
         let gridCtx = gridCanvas.getContext('2d');
         for (let y = 0; y < this.height; y++) {
         for (let x = 0; x < this.width; x++) {
         gridCtx.fillStyle = grid[y][x] >0 ? 'black':'white';
         gridCtx.fillRect(x,y,1,1);
         }
         } document.body.appendChild(gridCanvas);
         */
        return grid;
    }

    toWalkableGrid() {
        //TODO
    }
}

export default Level;