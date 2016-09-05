import {MIN_DUNGEON_WIDTH} from '../Constants';
/**
 * A Level contains a set of rooms, the tiles array, logic for entering and leaving.
 */
class Level {
    tiles = [];
    rooms = [];
    constructor(opts) {
        //bi-dimensional array of Tiles.
        this.tiles = [];
        this.width = opts.width ? opts.width : MIN_DUNGEON_WIDTH;
        this.width = opts.width ? opts.width : MIN_DUNGEON_WIDTH;
        this.entry = {};
        this.exit = {};
    }

    /**
     * Fill the level with empty tiles.
     * @param width
     * @param height
     */
    initialize(width, height) {
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

    getTileAt(x, y) {
        if (x >= 0 && x < DUNGEON_WIDTH && y >= 0 && y < DUNGEON_HEIGHT) {
            return this.tiles[x][y];
        } else {
            return undefined;
        }
    }

    //Converts the dungeon into an astar compatible bi dimensional array, with 0 for for obstacles
    toDiggableGrid() {

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

    toWalkableGrid(corridors) {
        //TODO
    }
}

export default Level;